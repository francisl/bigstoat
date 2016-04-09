import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FilePresenter from '../file-manager/file-manager.jsx';
import CommandLine from '../command-line/command-line.jsx';

const propTypes = {
    className: PropTypes.string
};

const ResultContainer = (props) => {
    const { className, ...otherProps } = props;

    const classes = classNames({}, className);

    return (
        <div className={classes} {...otherProps}>
            <FilePresenter />
            <CommandLine />
        </div>
    );
};

ResultContainer.propTypes = propTypes;
export default ResultContainer;
