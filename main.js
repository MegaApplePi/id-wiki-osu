/* globals require, __dirname, process */
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;
function createWindow(){
 win = new BrowserWindow({
  "icon": __dirname + "/icon/png/16.png",
  "minHeight": 256 + 39,
  "height": 256 + 39,
  // potential electron bug, minWidth doesn't match DOM's width (8px of extra window space on all sides?)
  "minWidth": 400 + 16,
  "width": 400 + 16,
 });
 win.setMenu(null);

 win.loadURL(url.format({
  "pathname": path.join(__dirname, "index.html"),
  "protocol": "file:",
  "slashes": true
 }));

 //win.webContents.openDevTools();

 win.on("closed", () => {
  win = null;
 });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
 if( process.platform !== "darwin" ){
  app.quit();
 }
});

app.on("active", () => {
 if( win === null ){
  createWindow();
 }
});
