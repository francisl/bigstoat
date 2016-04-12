import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'react-mdl/lib/Icon';
import BreadcrumbBuilder from '../../lib/breadcrumb';


const BreadcrumbLinkPropTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    children: PropTypes.object,
    onClick: PropTypes.func
};
const BreadcrumbLink = (props) => {
    const { className, path, onClick, children, ...otherProps } = props;
    return <a onClick={ onClick(path) } title={path}>{ children }</a>;
}
BreadcrumbLink.propTypes = BreadcrumbLinkPropTypes;


const BreadcrumbSeparatorPropTypes = {
    className: PropTypes.string,
    children: PropTypes.object
};
const BreadcrumbSeparator = (props) => {
    const { className, children, ...otherProps } = props;
    return <span className="separator">{children}</span>;
}
BreadcrumbSeparator.propTypes = BreadcrumbSeparatorPropTypes;


const propTypes = {
    className: PropTypes.string,
    path: PropTypes.Object,
    separator: PropTypes.string,
    onClick: PropTypes.func
};
const Breadcrumb = (props) => {
    const { className, path, separator, onClick, children, ...otherProps } = props;
    const classes = classNames({}, className);
    const breadcrumb = BreadcrumbBuilder(path, separator).map((p) => {
        if(p.type == 'root'){
            return <BreadcrumbLink onClick={onClick} path={p.path}><BreadcrumbSeparator>{p.name}</BreadcrumbSeparator></BreadcrumbLink>;
        } else if (p.type === 'currentDir'){
            return <BreadcrumbLink onClick={onClick} path={p.path}>{ p.name }</BreadcrumbLink>;
        }
        return [
            <BreadcrumbLink onClick={onClick} path={p.path}>{ p.name }</BreadcrumbLink>,
            <BreadcrumbLink onClick={onClick} path={p.path}><BreadcrumbSeparator>{separator}</BreadcrumbSeparator></BreadcrumbLink>
        ];
    });

    return <div id="PwdBreadcrumb" className={classes} {...otherProps}> { breadcrumb } </div>;
};

Breadcrumb.propTypes = propTypes;
export default Breadcrumb;
