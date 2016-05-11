// @flow

var ipcMain = require('electron').ipcMain;
var exec = require('child_process');
var fs = require('fs');
var path = require('path');
var os = require('os');

ipcMain.on('fs:open:file', function(event, requestPath) {
    const cmd2Exec = 'open ' + `"${requestPath}"`;
    exec.exec(cmd2Exec); //, {detached: true, stdio: ['ignore']});
    event.returnValue = true;
});


function trashDeletePath(requestPath) {
    switch(os.type()) {
        case 'Darwin':
            const homeTrash = path.join(os.homedir(), '.Trash');
            const cmd2Exec = `mv "${requestPath}" ${homeTrash}`;
            exec.execSync(cmd2Exec);
            break;
        default:
            console.warn('Not supported')
    }
}

ipcMain.on('fs:delete:path', function(event, requestPath) {
    console.log('deleting : ', requestPath);
    trashDeletePath(requestPath);
    event.returnValue = true;
});


function getAvailableDirName (currentDir: string, index: ?number) {
    const currentIndex = index || 1;
    const fileName = `New Dir ${currentIndex}`;
    const newFilePath = path.join(currentDir, fileName);
    if (fs.existsSync(newFilePath)){
        return getAvailableDirName(currentDir, currentIndex+1);
    } else {
        return newFilePath;
    }
}

ipcMain.on('fs:create:dir', function(event, currentDir: string) {
    const newFilePath = getAvailableDirName(currentDir);
    fs.mkdirSync(newFilePath);
    event.returnValue = newFilePath;
});
