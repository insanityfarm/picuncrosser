import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {className: 'Header'};
    }

    render() {
        return (
            <th scope="row" className={this.state.className}><div>{this.renderHeader()}</div></th>
        );
    }

    renderHeader() {
        return this.props.header;
    }

}

export default Header;