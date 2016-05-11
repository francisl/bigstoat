// @flow

const remote = window.require('remote');
var Menu = remote.require('menu');
var ipc = window.require('electron').ipcRenderer;

export function deletePath (path: string) {
    console.log('api deleting path :', path);
    const deleted = ipc.sendSync('fs:delete:path', path);
}

export function createDir (path: string) {
    console.log('api creating dir');
    const created = ipc.sendSync('fs:create:dir', path);
}