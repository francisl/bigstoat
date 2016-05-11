import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string
};

const Directory = (props) => {
    const { className, children, ...otherProps } = props;

    const classes = classNames({
        'file-element': true
    }, className);

    return (
        <div className={classes} {...otherProps}>
            <i className="folder icon" />
            <p>{ children }</p>
        </div>
    );
};

Directory.propTypes = propTypes;
export default Directory;
