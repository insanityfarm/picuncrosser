import React, { Component } from 'react';
import './Picuncrosser.css';
import Puzzle from './Puzzle.js';

export default class Picuncrosser extends Component {
    render() {
        return (
            <div className="Picuncrosser">
                <h1>Picuncrosser</h1>
                <Puzzle />
            </div>
        );
    }
}
