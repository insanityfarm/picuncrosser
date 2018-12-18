import React, { Component } from 'react';
import RowHeader from './Header/RowHeader';
import Cell from './Cell';
import RowFooter from './Footer/RowFooter';
import './Row.css';

class Row extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <RowHeader header={this.props.header} />
                {this.props.cells.map((status, i) => <Cell key={'cell-'+this.props.num+'-'+i} />)}
                <RowFooter key={'rowfooter-'+this.props.num} />
            </div>
        );
    }

}

export default Row;