import {createDir, deletePath}  from './dir-file-api.js';

const remote = window.require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');


const fileItemMenuTemplate = [{
		label: 'Delete',
		click: function(d, e) {
			deletePath(d.menu._path);
		}
	}
];
const fileItemMenu = new Menu.buildFromTemplate(fileItemMenuTemplate);

export function onItemRightClickMenu(e, path){
	e.preventDefault();
	if (e.target !== e.currentTarget) {
		fileItemMenu._path = path;
		fileItemMenu.popup(remote.getCurrentWindow());
		e.stopPropagation();
	}
}

const currentDirMenutTemplate = [
	{ 	label: `Create Directory`,
		click: function(d, e) { 
		   createDir(d.menu._path); 
		}
	}
];
const menu = new Menu.buildFromTemplate(currentDirMenutTemplate);

export function onDirectoryRightClickMenu(e, path){
	e.preventDefault();
	if (e.target === e.currentTarget) {
		menu._path = path;
		menu.popup(remote.getCurrentWindow());
		e.stopPropagation();
	}
}