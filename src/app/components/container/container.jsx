import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FileManager from '../file-manager/file-manager.jsx';
import CommandLine from '../command-line/command-line.jsx';

const propTypes = {
    className: PropTypes.string
};

const style = {
    width: '100%'
}

const ResultContainer = (props) => {
    const { className, ...otherProps } = props;

    const classes = classNames({}, className);

    return (
        <div style={style} className={classes} {...otherProps}>
            <FileManager />
        </div>
    );
};

ResultContainer.propTypes = propTypes;
export default ResultContainer;
