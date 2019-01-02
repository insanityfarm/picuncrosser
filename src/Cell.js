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
        let drawMode = this.props.inputMode.drawMode;

        if(typeof drawMode === 'undefined') {
            if(!classes.disabled && !classes.active) {
                drawMode = {
                    active:     !this.props.inputMode.isModifierActive,
                    disabled:   this.props.inputMode.isModifierActive
                };
            } else {
                drawMode = {
                    active:     false,
                    disabled:   false
                };
            }
            this.props.setDrawMode(drawMode);
        }
        //console.log(drawMode);

        if(drawMode.disabled) {
            classes.disabled = !classes.active;
        } else {
            if(!classes.disabled) {
                classes.active = drawMode.active;
                classes.disabled = false;
            } else {
                classes.disabled = drawMode.active;
            }
        }

        // PROBLEMS OCCURRING:
        //  Erasing a disabled cell then dragging to a non-disabled cell erases the non-disabled one too
        //  Vice versa: Erasing a non-disabled cell then dragging to a disabled one erases both
        // ONLY THE INITIAL TYPE SHOULD BE ERASED


        this.setState({classes: classes});
    }
}

export default Cell;