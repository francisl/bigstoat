import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'react-mdl/lib/Icon';

const propTypes = {
    className: PropTypes.string
};

const File = (props) => {
    const { className, children, ...otherProps } = props;

    const classes = classNames({
        'file-element': true
    }, className);
    
    return (
        <div className={classes} {...otherProps}>
            <Icon name="insert_drive_file" />
            <p>{ children }</p>
        </div>
    );
};

File.propTypes = propTypes;
export default File;
