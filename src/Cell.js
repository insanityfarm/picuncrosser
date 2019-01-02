import React, { Component } from 'react';
import classNames from 'classnames';
import './Cell.css';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: {
                cell: true,
                active: false,
                disabled: false
            }
        };
        this.handleMousedown = this.handleMousedown.bind(this);
        this.handleMouseenter = this.handleMouseenter.bind(this);
        this.draw = this.draw.bind(this);
    }

    render() {
        return (
            <td scope="cell" className={classNames(this.state.classes)} onMouseDown={this.handleMousedown} onMouseEnter={this.handleMouseenter} />
        );
    }

    handleMousedown(e) {
        this.props.handlers.mousedown(e); // before component-specific handling, the Puzzle component handles the event
        this.draw();
    }

    handleMouseenter(e) {
        this.props.handlers.mouseenter(e); // before component-specific handling, the Puzzle component handles the event
        if(this.props.inputMode.isDrawing) {
            this.draw();
        }
    }

    draw() {

        // CONDITIONS:
        // NO MODIFIER and NOT ACTIVE and NOT DISABLED
        //  active: true, disabled: false
        // MODIFIER and NOT ACTIVE and NOT DISABLED
        //  active: false, disabled: true
        // either ACTIVE or DISABLED (don't care about MODIFIER)
        //  active: false, disabled: false

        let classes = this.state.classes;
        if(!classes.disabled && !classes.active) {
            classes.active      = !this.props.inputMode.isModifierActive;
            classes.disabled    = this.props.inputMode.isModifierActive;
        } else {
            classes.active      = false;
            classes.disabled    = false;
        }
        this.setState({classes: classes});

    }
}

export default Cell;