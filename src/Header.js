import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {className: 'Header'};
    }

    render() {
        return (
            <div className={this.state.className}>{this.renderHeader()}</div>
        );
    }

    renderHeader() {
        return this.props.header;
    }

}

export default Header;