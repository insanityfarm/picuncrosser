import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {className: 'Footer'};
    }

    render() {
        return (
            <div className={this.state.className}></div>
        );
    }

}

export default Footer;