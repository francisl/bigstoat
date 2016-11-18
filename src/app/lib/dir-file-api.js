// @flow

const {app, Menu} = require('electron')
const {ipcRenderer} = require('electron')

export function deletePath (path: string) {
    console.log('api deleting path :', path);
    const deleted = ipcRenderer.sendSync('fs:delete:path', path);
}

export function createDir (path: string) {
    console.log('api creating dir');
    const created = ipcRenderer.sendSync('fs:create:dir', path);
}