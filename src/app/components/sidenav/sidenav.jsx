import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Menu } from 'semantic-ui-react'

const propTypes = {
    className: PropTypes.string
};

class Sidenav extends Component {
    constructor(props) {
        super();
        const { className, ...otherProps } = props;
        const classes = classNames({}, className);
    }

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div id="SidenavContainer">
                <Menu pointing secondary vertical>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Item name='application' active={activeItem === 'application'} onClick={this.handleItemClick} />
                    <Menu.Item name='workspace' active={activeItem === 'workspace'} onClick={this.handleItemClick} />
                </Menu>
            </div>
        )
    }
};

Sidenav.propTypes = propTypes;
export default Sidenav;
