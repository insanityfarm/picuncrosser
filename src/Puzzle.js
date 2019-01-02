import React, { Component } from 'react';
import ColHeader from './Header/ColHeader';
import Row from './Row';
import './Puzzle.css';
import ColFooter from "./Footer/ColFooter";
import RowFooter from "./Footer/RowFooter";

const samples = {
    jackolantern: {
        rows: [[1], [3], [8], [10], [2, 3, 1], [2, 1, 1, 1], [10], [2, 1, 1, 1, 1], [2, 1, 1, 1], [6]],
        cols: [[5], [7], [2, 1, 2], [2, 2, 1], [6, 2], [5, 2, 1], [6, 2], [2, 2, 1], [2, 1, 1], [5]]
    },
    rake: {
        rows: [[2],[1,1],[10],[1,1],[2]],
        cols: [[3],[1],[1],[1],[1],[1],[1],[1],[5],[1,1,1]]
    },
    soccer: {
        rows: [[3],[5],[3,1],[2,1],[3,3,4],[2,2,7],[6,1,1],[4,2,2],[1,1],[3,1],[6],[2,7],[6,3,1],[1,2,2,1,1],[4,1,1,3],[4,2,2],[3,3,1],[3,3],[3],[2,1]],
        cols: [[2],[1,2],[2,3],[2,3],[3,1,1],[2,1,1],[1,1,1,2,2],[1,1,3,1,3],[2,6,4],[3,3,9,1],[5,3,2],[3,1,2,2],[2,1,7],[3,3,2],[2,4],[2,1,2],[2,2,1],[2,2],[1],[1]]
    },
    spray: {
        rows: [[1], [1, 2, 2], [1, 2], [1, 1, 4], [1, 1, 2], [2, 1], [1, 2], [2, 1], [1, 2], [4]],
        cols: [[], [1, 1], [1, 1, 1], [1, 1], [1], [7], [3, 1, 1, 1], [4, 1, 2], [7], []]
    }
};

class Puzzle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...samples.jackolantern // change this to pre-load different puzzles (temp method)
        };
        this.state.grid = this.prepareGrid();
        this.state.maxColNumberCount = this.getMaxColNumberCount();
        this.state.inputMode = {
            isDrawing:          false,
            drawMode:           undefined, // object to indicate cells to draw on, and how to draw

            // active: true,  disabled: false
            // active: false, disabled: false
            // active: false, disabled: true

            direction:          undefined, // where true = vertical, false = horizontal, and undefined = not set
            isModifierActive:   false
        };
        this.handleMousedown    = this.handleMousedown.bind(this);
        this.handleMouseup      = this.handleMouseup.bind(this);
        this.handleMouseenter   = this.handleMouseenter.bind(this);
        this.handleKeydown      = this.handleKeydown.bind(this);
        this.handleKeyup        = this.handleKeyup.bind(this);
        this.updateStateObject  = this.updateStateObject.bind(this);
        this.setDrawMode        = this.setDrawMode.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseup, false);
        window.addEventListener('keydown', this.handleKeydown, false);
        window.addEventListener('keyup', this.handleKeyup, false);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleMouseup);
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('keyup', this.handleKeyup);
    }

    render() {
        // https://www.w3.org/WAI/tutorials/tables/two-headers/#table-with-header-cells-in-the-top-row-and-first-column
        return (
            <table className="Puzzle" style={{'--number-of-rows': + this.state.rows.length, '--number-of-cols': + this.state.cols.length, '--max-col-number-count': this.state.maxColNumberCount}}>
                <thead>
                    <tr>
                        <th />
                        {this.state.cols.map((header, i) => (
                            <ColHeader header={header} key={'colheader-'+i} />
                        ))}
                        <RowFooter key={'rowfooter-0'} />
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows.map((header, i) => (
                        <Row num={i} cells={this.state.grid[i]} header={header} key={'row-'+i} handlers={this.getHandlers()} inputMode={this.state.inputMode} setDrawMode={this.setDrawMode} />
                    ))}
                </tbody>
                <tfoot>
                    <tr className={'colfooter-row'}>
                        <th />
                        {this.state.cols.map((header, i) => (
                            <ColFooter key={'colfooter-'+i} col={i} />
                        ))}
                        <ColFooter key={'colfooter-'+this.state.cols.length} col={this.state.cols.length} />
                    </tr>
                </tfoot>
            </table>
        );
    }

    prepareGrid() {
        // add blank rows and/or cols to grid as needed, or truncate if there are too many
        let grid = this.state.grid || [[]];
        for(let i = 0; i < this.state.rows.length; i++) {
            if(grid[i] === undefined) {
                grid[i] = [];
            }
            for(let j = 0; j < this.state.cols.length; j++) {
                if(grid[i][j] === undefined) {
                    grid[i][j] = 0;
                }
                grid[i].splice(this.state.cols.length);
            }
        }
        grid.splice(this.state.rows.length);
        return grid;
    }

    getMaxColNumberCount() {
        // determine the largest amount of numbers associated with any column
        let max = 0;
        for(let i = 0; i < this.state.cols.length; i++) {
            max = Math.max(max, this.state.cols[i].length);
        }
        return max;
    }

    handleMousedown(e) {
        e.preventDefault();
        this.updateStateObject('inputMode', 'isDrawing', true);
    }

    handleMouseup(e) {
        e.preventDefault();
        this.updateStateObject('inputMode', 'isDrawing', false);
        this.setDrawMode(undefined);
    }

    handleMouseenter(e) {
        e.preventDefault();
    }

    handleKeydown(e) {
        if(e.key === 'Shift') {
            this.updateStateObject('inputMode', 'isModifierActive', true);
        }
    }

    handleKeyup(e) {
        if(e.key === 'Shift') {
            this.updateStateObject('inputMode', 'isModifierActive', false);
        }
    }

    setDrawMode(drawMode) {
        this.updateStateObject('inputMode', 'drawMode', drawMode);
    }

    updateStateObject(name, key, value) {
        this.setState((prevState) => {
            return {[name]: {...prevState[name], ...{[key]: value}}};
        });
    }

    getHandlers() {
        return {
            mousedown:  this.handleMousedown,
            mouseup:    this.handleMouseup,
            mouseenter: this.handleMouseenter,
            keydown:    this.handleKeydown,
            keyup:      this.handleKeyup
        };
    }

}

export default Puzzle;