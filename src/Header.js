import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {className: 'Header'};
    }

    render() {
        return (
            <th
                scope="row"
                className={this.state.className}
                title={'Delete'}
            >
                <div title={'Edit'}>{this.renderHeader()}</div>
            </th>
        );
    }

    renderHeader() {
        return this.props.header;
    }

}