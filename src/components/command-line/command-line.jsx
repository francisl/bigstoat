import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string
};

const CommandLine = (props) => {
    const { className, ...otherProps } = props;

    const classes = classNames({}, className);

    return (
        <div className={classes} {...otherProps}>
            <input type="text"></input>
        </div>
    );
};

CommandLine.propTypes = propTypes;
export default CommandLine;
