import React, { Component } from 'react';
import RowHeader from './Header/RowHeader';
import Cell from './Cell';
import RowFooter from './Footer/RowFooter';
import './Row.css';

export default class Row extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <tr>
                <RowHeader header={this.props.header} />
                {this.props.cells.map((classes, i) =>
                    <Cell
                        key={'cell-'+this.props.num+'-'+i}
                        row={this.props.num}
                        col={i}
                        classes={classes}
                        handlers={this.props.handlers}
                        inputMode={this.props.inputMode}
                        setCellClasses={this.props.setCellClasses}
                        setDrawMode={this.props.setDrawMode}
                    />
                )}
                <RowFooter key={'rowfooter-' + (this.props.num + 1)} />
            </tr>
        );
    }

}