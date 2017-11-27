/* jshint browser: true */
(function () {
  "use strict";

  function $(selector) {
    return document.querySelectorAll(selector);
  }

  const $inputText = $('input[type="text"]')[0];
  const $loading = $('loading')[0];
  const $snackbar = $('snackbar')[0];
  const $markdown = $('markdown')[0];

  $inputText.addEventListener('keydown', function (e) {
    if (!$snackbar.hasAttribute('hidden')) {
      $snackbar.setAttribute('hidden', '');
    }
    if (e.key === "Enter") {
      let value = this.value;
      if (this.checkValidity() && value.length > 2) {
        this.setAttribute('disabled', '');
        $loading.removeAttribute('hidden');

        fetch(`https://osu.ppy.sh/users/${window.encodeURIComponent(value)}`, {
          "method": "HEAD",
          "headers": new Headers({
            "Access-Control-Allow-Origin": "*"
          }),
          "mode": "cors",
          "cache": "default",
          "credentials": "omit"
        }).then(function (e) {
          console.log(e);
        }).catch(function (e) {
          console.log(e);
        });
      } else {
        $snackbar.setAttribute('data-state', 'empty');
        $snackbar.removeAttribute('hidden');
      }
    }
  }, false);
  /*$webview.addEventListener('did-stop-loading', function () {
  let state;
  let id;
  try {
    //id = $webview.src.match(/[0-9]*$/)[0];
    id = $webview.src;
    id = id.substring(id.lastIndexOf("/") + 1, id.length);
    state = "passed";
  } catch (e) {
    state = "failed";
  } finally {
    if (id.length > 0 && !Number.isNaN(Number(id))) {
      if ($markdown.getAttribute('data-state') === 'enabled') {
        let title = $webview.getTitle().replace(/(\'s profile)$/, "");
        id = "[" + title + "](https://osu.ppy.sh/users/" + id + ")";
      }
      //clipboard.writeText(id);
    } else {
      state = "empty";
    }
    $loading.setAttribute('hidden', '');
    $inputText.removeAttribute('disabled');
    $snackbar.setAttribute('data-state', state);
    $snackbar.removeAttribute('hidden');
  }
});*/
})();
