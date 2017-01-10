import React, { PropTypes } from 'react';

const style = {
    width: '100%',
    height: '100%',
    overflow: 'auto'
}

const ScrollView = (props) => {
    const { children, ...otherProps } = props;
    return (
        <div class="ScrollView" style={style} {...otherProps}>
            {children}
        </div>
    );
};

export default ScrollView;
