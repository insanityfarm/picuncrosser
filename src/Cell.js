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
                isSetting:  (!classes.disabled && !classes.active),
                type:       this.props.inputMode.isModifierActive ? 'disabled' : 'active'
            };
            this.props.setDrawMode(drawMode);
        }

        // TODO: Simplify this logic, there must be a way
        if(classes.disabled) {
            if(!drawMode.isSetting && drawMode.type === 'disabled') {
                // classes.active = false;
                classes.disabled = false;
            }
        } else {
            if(classes.active) {
                if(!drawMode.isSetting && drawMode.type === 'active'){
                    classes.active = false;
                    // classes.disabled = false;
                }
            } else {
                if(drawMode.isSetting && drawMode.type === 'active') {
                    classes.active = true;
                    // classes.disabled = false;
                }
                if(drawMode.isSetting && drawMode.type === 'disabled') {
                    // classes.active = false;
                    classes.disabled = true;
                }
            }
        }

        this.setState({classes: classes});
    }
}

export default Cell;