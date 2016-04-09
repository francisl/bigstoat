import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'react-mdl/lib/Icon';



function extractCurrentPath(array: Array, currentIndex: int) {
    var path = '';
    console.log(`array ($currentIndex): ${array}`);
    for (var i = 0; i <= currentIndex; i++){
        if (i === 0) {
            path = '/';
        } else if (i === 1){
            path = `${path}${array[i]}`;
        } else {
            path = `${path}/${array[i]}`;
        }
        
    }
    console.log('extract path : ', path);
    return path;
}

const BreadcrumbLinkPropTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func
};

const BreadcrumbLink = (props) => {
    const { className, path, onClick, children, ...otherProps } = props;
    return <a onClick={ onClick(path) } title={path}>{ children }</a>;
}
BreadcrumbLink.propTypes = BreadcrumbLinkPropTypes;

const propTypes = {
    className: PropTypes.string,
    pwd: PropTypes.string,
    onClick: PropTypes.func
};


const Breadcrumb = (props) => {
    const { className, pwd, onClick, children, ...otherProps } = props;

    const classes = classNames({}, className);
    const pwdBreadcrumb = pwd.split('/')
        .reduce((previousValue, currentValue, currentIndex, array) => {
            if(currentValue == ""){
                return <BreadcrumbLink onClick={onClick} path="/"><span className="separator">/</span></BreadcrumbLink>
            } else if(currentIndex === 0) {
                console.log('current index 0');
                return [previousValue, 
                    <BreadcrumbLink onClick={onClick} path={extractCurrentPath(array, currentIndex)}>{ currentValue }</BreadcrumbLink>];
            }
            return [
                previousValue,
                <BreadcrumbLink onClick={onClick} path={extractCurrentPath(array, currentIndex-1)}><span className="separator">/</span></BreadcrumbLink>,
                <BreadcrumbLink onClick={onClick} path={extractCurrentPath(array, currentIndex)}>{ currentValue }</BreadcrumbLink>,
            ];
        });
    
    
    return (
        <div id="PwdBreadcrumb" className={classes} {...otherProps}>
            { pwdBreadcrumb }
        </div>
    );
};

Breadcrumb.propTypes = propTypes;
export default Breadcrumb;
