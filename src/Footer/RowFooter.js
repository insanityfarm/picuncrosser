// import React from 'react';
import Footer from '../Footer';
import './RowFooter.css';

export default class RowFooter extends Footer {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        this.state.className += " RowFooter";
        return super.render();
    }

}