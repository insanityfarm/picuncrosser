// import React from 'react';
import Header from '../Header';
import './ColHeader.css';

class ColHeader extends Header {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        this.state.className += " ColHeader";
        return super.render();
    }

    /* TODO: Visual fix for 3+ digit numbers in column headers */
    renderHeader() {
        return this.props.header.join('\n');
    }

}

export default ColHeader;