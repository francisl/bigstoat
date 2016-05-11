import React, { PropTypes } from 'react';
import classNames from 'classnames';
import BreadcrumbBuilder from '../../lib/breadcrumb';


const BreadcrumbItemPropTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.string
};
const BreadcrumbItem = (props) => {
    const { className, path, onClick, children, ...otherProps } = props;
    const classes = classNames({
        'link': !!path
    }, className);
    return <div className={classes} onClick={ onClick(path) } title={path}>{ children }</div>;
}
BreadcrumbItem.propTypes = BreadcrumbItemPropTypes;


const BreadcrumbSeparatorPropTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.string
};
const BreadcrumbSeparator = (props) => {
    const { className, path, onClick, children, ...otherProps } = props;

    const classes = classNames({
        'separator': true,
        'link': !!path
    }, className);
    return <div className={classes} onClick={onClick(path)} path={path}>{children}</div>;
}
BreadcrumbSeparator.propTypes = BreadcrumbSeparatorPropTypes;


const propTypes = {
    className: PropTypes.string,
    path: PropTypes.object,
    separator: PropTypes.string,
    onClick: PropTypes.func
};
const Breadcrumb = (props) => {
    const { className, path, separator, onClick, children, ...otherProps } = props;
    const classes = classNames({}, className);
    const decomposedPath = BreadcrumbBuilder(path, separator);
    const breadcrumb = decomposedPath.map((p) => {
        if(p.type == 'root'){
            return <BreadcrumbSeparator onClick={onClick} path={p.path}>{p.name}</BreadcrumbSeparator>;
        } else if (p.type === 'currentDir'){
            return <div className="currentDir">{p.name}</div>;
        }
        return [
            <BreadcrumbItem onClick={onClick} path={p.path}>{ p.name }</BreadcrumbItem>,
            <BreadcrumbSeparator onClick={onClick} path={p.path}>{separator}</BreadcrumbSeparator>
        ];
    });
    return <div id="PwdBreadcrumb" className={classes} {...otherProps} > { breadcrumb } </div>;
};

Breadcrumb.propTypes = propTypes;
export default Breadcrumb;
