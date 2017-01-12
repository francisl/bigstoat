import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Breadcrumb from './breadcrumb.jsx';
import File from './file.jsx';
import Directory from './directory.jsx';
import { onItemRightClickMenu, onDirectoryRightClickMenu } from '../../lib/right-click-menu.js';
import { addItemMenu } from '../../lib/right-click-menu.js';
import { ScrollView } from 'baer-toolkit';

const {app, Menu} = require('electron')
const ipc = require('electron').ipcRenderer;

class FileManager extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = { 
            fileList: []
        };
    }

    componentDidMount() {
        ipc.on('fs:dirchange:update', () => {
            this.syncDirCb(this.state.pwd.requestDir)();  
        });
    }
    
    componentWillMount() {
        const currentDir = ipc.sendSync('fs:get:home:sync')
        this.updateState(currentDir);
    }

    syncDirCb(path) {
        return () => {
            ipc.on('fs:response:home', (event, currentDir) => {
                this.updateState(currentDir);
            });
            ipc.send('fs:get:dir:async', path);
        };
    }

    updateState(currentDir) {;
        ipc.send('fs:listen:dirchange', currentDir.pwd.requestDir);
        this.setState(currentDir);
    }

    openFile(path) {
        return () => {
            ipc.sendSync('fs:open:file', path);
        };
    }

    renderByType(file) {
        if (file.isDirectory){
            return <Directory onClick={this.syncDirCb(file.path)} onContextMenu={(e) => onItemRightClickMenu(e, file.path)}>{file.base}</Directory>;
        } else if (file.isFile) {
            return <File className="js-dir-file-element" onClick={this.openFile(file.path)} onContextMenu={(e) => onItemRightClickMenu(e, file.path)}>
                    {file.base}</File>;
        }
        return <File className="js-dir-file-element" onClick={this.syncDirCb(file.path)} onContextMenu={(e) => onItemRightClickMenu(e, file.path)}>
                {file.base}</File>;
 
    }

    render () {
        const { className, ...otherProps } = this.props;
        const classes = classNames({}, className);
        const fileUI = this.state.fileList.map((file) => {
            return (
                <div key={file.base} className="file-item-container" data-path={file.path}>
                    { this.renderByType(file) }
                </div>);
        });
        return (
            <div id="FileManageContainer">
                <Breadcrumb onClick={this.syncDirCb.bind(this)} separator={ this.state.sep } path={ this.state.pwd }/>
                <ScrollView>
                    <div id="FilePresenterContainer" 
                        className={classes} {...otherProps} 
                        onContextMenu={(e) => onDirectoryRightClickMenu(e, this.state.pwd.requestDir)} 
                        data-path={this.state.pwd.requestDir}>
                        {fileUI}
                    </div>
                </ScrollView>
            </div>
        );
    }
};

export default FileManager;
