import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {className: 'Footer'};
    }

    render() {
        return (
            <td className={this.state.className} style={{'--column': this.props.col}} title={'Insert'}></td>
        );
    }

}

export default Footer;