// import React from 'react';
import Header from '../Header';
import './RowHeader.css';

class RowHeader extends Header {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        this.state.className += " RowHeader";
        return super.render();
    }

    renderHeader() {
        return this.props.header.join('\u00A0');
    }

}

export default RowHeader;