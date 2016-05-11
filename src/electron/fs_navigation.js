//@flow
var ipcMain = require('electron').ipcMain;
var fs = require('fs');
var path = require('path');
var os = require('os');
var exec = require('child_process');

function filterHiddenFile(file: string) {
    if (file.startsWith('.')) {
        return false;
    }
    return true;
}

function createFileObject(requestDir: string, fileName: string) {
    const filePath: string = path.join(requestDir, fileName);
    const stat = fs.statSync(filePath);
    let fileInfo = {
        stat: stat,
        path: filePath,
        isDirectory: stat.isDirectory(),
        isFile: stat.isFile()
    };
    const fileObj = Object.assign({}, fileInfo, path.parse(filePath)); 
    return fileObj;
}

function listDir(event: Object, requestDir: string, showHidden=false){
    console.log('request dir : ', requestDir);
    let fileList = [];
    fs.readdir(requestDir, (err, files) =>{
        files
        .filter(filterHiddenFile)
        .forEach((fileName) => {
            fileList.push(createFileObject(requestDir, fileName));
        });
        
        const dirInfo = {
            pwd: Object.assign({}, {requestDir}, path.parse(requestDir)),
            sep: path.sep,
            fileList
        }
        event.sender.send('fs:response:home', dirInfo);
        event.returnValue = dirInfo;
    });
      
    
}

var dirWatcher = undefined;

function listen(){
    console.log('Listening ......');
    ipcMain.on('fs:get:home:sync', function(event) {
        listDir(event, os.homedir());
    });
    
    ipcMain.on('fs:get:dir:async', function(event, requestDir) {
        listDir(event, requestDir);
    });

    ipcMain.on('fs:get:dir:sync', function(event, requestDir) {
        listDir(event, requestDir);
    });
    
    ipcMain.on('fs:listen:dirchange', (event, requestDir) => {
        if (dirWatcher) {
            dirWatcher.close();
        }
        dirWatcher = fs.watch(requestDir, (e, filename) => {
            console.log(`event is: ${e} with file ${filename}`);
            if (filename) {
                console.log(`filename provided: ${filename}`);
            } else {
                console.log('filename not provided');
            }
            event.sender.send('fs:dirchange:update', filename);
        });
    });
}

exports.listen = listen;