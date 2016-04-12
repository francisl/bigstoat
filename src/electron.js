// @flow
var electron = require('electron');
var ipcMain = require('electron').ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var fs = require('fs');
var os = require('os');
var path = require('path');
let mainWindow;

function createWindow () {
  // Create the browser window.
  	mainWindow = new BrowserWindow({width: 800, height: 600,
    	"web-preferences": {
      	"web-security": false
    	}
	});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/../index.html');
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

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


function filterHiddenFile(file) {
    if (file.startsWith('.')) {
        return false;
    }
    return true;
}

function createFileObject(requestDir, file) {
    const filePath = path.join(requestDir, file);
    const stat = fs.statSync(filePath);
    let fileInfo = {
        stat: stat,
        isDirectory: stat.isDirectory(),
        isFile: stat.isFile()
    };
    console.log('file path : ', filePath);
    return Object.assign({}, fileInfo, path.parse(filePath));
}

function listDir(event, requestDir, showHidden=false){
    console.log('listing : ', requestDir);
    let fileList = [];
    fs.readdir(requestDir, (err, files) =>{
        files
        .filter(filterHiddenFile)
        .forEach((file) => {
            fileList.push(createFileObject(requestDir, file));
        });

        event.returnValue = {
            pwd: Object.assign({}, {requestDir}, path.parse(requestDir)),
            sep: path.sep,
            fileList
        };
    });

    event.sender.send('fs:currentPath:async', {
        path: requestDir
    });
}

ipcMain.on('fs:get:home:sync', function(event) {
    listDir(event, os.homedir());
});

ipcMain.on('fs:get:dir:sync', function(event, requestDir) {
    console.log('request dir : ', requestDir);
    listDir(event, requestDir);
});
