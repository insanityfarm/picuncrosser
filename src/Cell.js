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
        let classes = this.state.classes;
        let drawMode = this.props.inputMode.drawMode;
        if(typeof drawMode === 'undefined') {
            drawMode = {
                isDrawing:      (!classes.disabled && !classes.active), // true = currently drawing, false = erasing
                isActiveType:   !this.props.inputMode.isModifierActive  // true = draw/erase active, false = disabled
            };
            this.props.setDrawMode(drawMode);
        }
        // fancy logic to handle draw mode logic in the most efficient way I know of
        // https://codeburst.io/using-javascript-bitwise-operators-in-real-life-f551a731ff5
        switch(+drawMode.isDrawing << 3 | +drawMode.isActiveType << 2 | +classes.active << 1 | +classes.disabled) {
            case 0b0001:
                classes.disabled = false;
                break;
            case 0b0010:
            case 0b0110:
                classes.active = false;
                break;
            case 0b1000:
                classes.disabled = true;
                break;
            case 0b1100:
                classes.active = true;
                break;
        }
        this.setState({classes: classes});
    }
}

export default Cell;