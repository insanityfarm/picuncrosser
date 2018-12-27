import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <td scope="cell" className="cell" />
        );
    }

}

export default Cell;