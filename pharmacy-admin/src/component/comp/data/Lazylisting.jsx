import React, { Component } from 'react'
import {CellMeasurerCache,CellMeasurer,AutoSizer,List,WindowScroller} from 'react-virtualized'
import {Table} from 'semantic-ui-react'


export default class Lazylisting extends Component {
    constructor(props) {
        super(props);


        this.overscanRowCount = 8;

    }
    
    rowRenderer = ({ index, key, parent, style }) => {
        const {list,listIndex,header}=this.props

        return (
        <div key={key} parent={parent}  style={{...style}}>
            {
                index!==0 ?
                    <Table.Row>
                            {
                                listIndex.map((col,key)=><Table.Cell style={{width:'220px'}} key={key}>{list[index-1][col]}</Table.Cell>)
                            }  
                    </Table.Row>:
                    <Table.Header>
                        <Table.Row>
                            {
                                !!header ? header.map((header,key)=><Table.HeaderCell style={{width:'220px'}} key={key}>{header}</Table.HeaderCell>):
                                listIndex.map((header,key)=><Table.HeaderCell style={{width:'250px'}} key={key}>{header}</Table.HeaderCell>)
                            }
                        </Table.Row>
                </Table.Header>    
            }
            </div>
        );
    }    
  
  
    render() {
        const {list,listIndex,header}=this.props
        return (
                <WindowScroller >
                    {({ height, scrollTop }) => (
                                <Table celled>
                                    <Table.Body>
                                    <List
                                        autoHeight
                                        height={height}
                                        rowCount={list.length+1}
                                        scrollTop={scrollTop}
                                        rowHeight={40}
                                        rowRenderer={this.rowRenderer}
                                        width={window.innerWidth}
                                        overscanRowCount={this.overscanRowCount}
                                    />
                                    </Table.Body>
                                </Table>
                    )} 
                </WindowScroller>
        )
    }
}