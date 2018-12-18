import React from 'react';
import Footer from '../Footer';
import './ColFooter.css';

class ColFooter extends Footer {

    constructor(props) {
        super(props);
    }

    render() {
        this.state.className += " ColFooter";
        return super.render();
    }

}

export default ColFooter;