import React, { PropTypes } from 'react';
import classNames from 'classnames';
import CommandLine from '../command-line/command-line.jsx';

const propTypes = {
    className: PropTypes.string
};

const ResultContainer = (props) => {
    const { className, ...otherProps } = props;

    const classes = classNames({}, className);

    return (
        <div className={classes} {...otherProps}>
            <CommandLine />
        </div>
    );
};

ResultContainer.propTypes = propTypes;
export default ResultContainer;
