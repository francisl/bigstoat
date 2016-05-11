import { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string
};


class File extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        item: PropTypes.object
    };
     
    constructor (props) {
        super(props);
        const { className, children, ...otherProps } = this.props;
        
        this.className = className;
        this.children = children;
        this.otherProps = otherProps;
    }
    render() {
        
        const classes = classNames({
            'file-element': true
        }, this.className);
        
        let elem = <div className={classes} {...this.otherProps}>
			<i className="file text outline icon"></i>
            <p>{ this.children }</p>
        </div>;
        return elem;
    }
    
};
File.propTypes = propTypes;



export default File;
