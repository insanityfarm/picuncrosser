import React, { Component } from 'react';
import './Picuncrosser.css';
import Puzzle from './Puzzle.js';

class Picuncrosser extends Component {
    render() {
        return (
            <div className="Picuncrosser">
                <h1>Picuncrosser</h1>
                <Puzzle />
            </div>
        );
    }
}

export default Picuncrosser;
