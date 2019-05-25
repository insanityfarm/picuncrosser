// import React from 'react';
import Footer from '../Footer';
import './ColFooter.css';

export default class ColFooter extends Footer {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        this.state.className += " ColFooter";
        return super.render();
    }

}