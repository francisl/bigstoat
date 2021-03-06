// @flow
var electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var fs = require('fs');
var os = require('os');
var path = require('path');
var exec = require('child_process');
var fsNavigation = require('./fs_navigation');
var fileManagement = require('./file_management');

let mainWindow;

function createWindow () {
  // Create the browser window.
  	mainWindow = new BrowserWindow({width: 1024, height: 780,
    	"web-preferences": {
      	"web-security": false
    	}
	});

  // and load the index.html of the app.
  const loadUrl = `file://${__dirname}/../../index.html`
  mainWindow.loadURL(loadUrl);
  console.log('dir name index : ', loadUrl);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

fsNavigation.listen();