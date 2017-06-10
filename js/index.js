/* globals document, window, XMLHttpRequest, nodeRequire, Sizzle, TriangleBG */
(function(){
  'use strict';

  const {clipboard} = nodeRequire('electron');

  const $ = Sizzle;

  const $inputText = $('input[type="text"]')[0];
  const $webview = $('webview')[0];
  const $loading = $('loading')[0];
  const $snackbar = $('snackbar')[0];
  const $markdown = $('markdown')[0];

  $inputText.addEventListener('keydown', function(e){
    if( !$snackbar.hasAttribute('hidden') ){
      $snackbar.setAttribute('hidden', '');
    }
    if( e.key === "Enter" ){
      let value = this.value;
      if( this.checkValidity() && value.length > 2 ){
        $webview.setAttribute('src', "https://osu.ppy.sh/users/" + window.encodeURIComponent(value));
        this.setAttribute('disabled', '');
        $loading.removeAttribute('hidden');
      }else{
        $snackbar.setAttribute('data-state', 'empty');
        $snackbar.removeAttribute('hidden');
      }
    }
  }, false);
  $webview.addEventListener('did-stop-loading', function(){
    let state;
    let id;
    try{
      id = $webview.src.match(/[0-9]*$/)[0];
      state = "passed";
    }catch(e){
      state = "failed";
    }finally{
      if( id.length > 0 ){
        if( $markdown.getAttribute('data-state') === 'enabled' ){
          id = "[" + $inputText.value + "](https://osu.ppy.sh/users/" + id + ")";
        }
        clipboard.writeText(id);
      }else{
        state = "empty";
      }
      $loading.setAttribute('hidden', '');
      $inputText.removeAttribute('disabled');
      $snackbar.setAttribute('data-state', state);
      $snackbar.removeAttribute('hidden');
    }
  });
  $markdown.addEventListener('click', function(){
    if( this.getAttribute('data-state') === 'enabled' ){
      this.setAttribute('data-state', 'disabled');
    }else{
      this.setAttribute('data-state', 'enabled');
    }
  });

  let $canvas = $('canvas')[0];
  let $altBG = $('alt-canvas')[0];
  let triangle = new TriangleBG({
    canvas: $canvas,
    alternateElem: $altBG,
    cellHeight: 120,
    cellWidth: 100,
    mouseLight: true,
    mouseLightRadius: 500,
    mouseLightIncrement: 10,
    resizeAdjustment: true,
    variance: 1.3,
    pattern: "x*y",
    baseColor1: {
      baseHue: 339,
      baseSaturation: 81,
      baseLightness: 58
    },
    baseColor2:{
      baseHue: 339,
      baseSaturation: 82,
      baseLightness: 66
    },
    colorDelta:{
      hue: 1,
      lightness: 0,
      saturation: 0
    }
  });
})();
