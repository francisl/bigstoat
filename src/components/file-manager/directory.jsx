import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'react-mdl/lib/Icon';

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
            <Icon name="folder" />
            <p>{ children }</p>
        </div>
    );
};

Directory.propTypes = propTypes;
export default Directory;
