import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Breadcrumb from './breadcrumb.jsx';
import File from './file.jsx';
import Directory from './directory.jsx';


class FilePresenter extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };
        
    constructor(props) {
        super(props);
        this.state = { fileList: [] };
        this.ipc = window.require('electron').ipcRenderer;
    }
    
    componentWillMount() {
        const currentDir = this.ipc.sendSync('fs:get:home:sync')
        console.log('got file : ', currentDir); 
         this.setState({
             fileList: currentDir.fileList,
             pwd: currentDir.pwd
         });
         
         
        // this.ipc.on('asynchronous-reply', function(event, arg) {
        //      console.log(arg); // prints "pong"
        // });
        // this.ipc.send('asynchronous-message', 'ping');
    }
    
    changeDir(path) {
        return () => {
            const currentDir = this.ipc.sendSync('fs:get:dir:sync', path);
            console.log('change dir : ', currentDir);
            this.setState({
                fileList: currentDir.fileList,
                pwd: currentDir.pwd
            });
        }
    }
    
    renderByType(file) {
        var path: string;
        if (file.dir === file.root) {
            path = `${file.dir}${file.base}`; 
        } else {
            path = `${file.dir}/${file.base}`;
        }
        if (file.isDirectory){
            
            return <Directory onClick={this.changeDir(path)}>
                        {file.base}</Directory>;
        } else if (file.isFile) {
            return <File onClick={this.changeDir(path)}>
                    {file.base}</File>;
        }
        return <File onClick={this.changeDir(path)}>
                {file.base}</File>;
        
    }
    
    render () {
        const { className, ...otherProps } = this.props;
        const classes = classNames({}, className);
       
        console.log('files : ', this.state.fileList);
        const fileUI = this.state.fileList.map((file) => {
            return (
                <div className="file-item-container">
                    { this.renderByType(file) }
                </div>);
        });

        return (
            <div>
                <Breadcrumb onClick={this.changeDir.bind(this)} pwd={ this.state.pwd }/>
                <div id="FilePresenterContainer" className={classes} {...otherProps}>
                    {fileUI}
                </div>
            </div>
        );
    }
};

export default FilePresenter;
