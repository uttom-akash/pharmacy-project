import React, { Component } from 'react'
import {CellMeasurer,CellMeasurerCache,createMasonryCellPositioner,Masonry,AutoSizer,WindowScroller} from 'react-virtualized'
import './SpecificDrugs.css'
import {Image,Label,Button} from 'semantic-ui-react'


export default class SpecificDrugs extends Component {

    constructor(props){
        super(props)
        this.state={
            columnWidth:280,
            height:280,
            gutter:10
        }

        this._columnCount=5
        this._cache=new CellMeasurerCache({
            defaultHeight:320,
            defaultWidth:250,
            fixedWidth:true
        })

        this._cellPositioner=createMasonryCellPositioner({
            cellMeasurerCache:this._cache,
            columnCount:this._columnCount,
            columnWidth:this.state.columnWidth,
            spacer:this.state.gutter
        })
    }    

    _getCollumnCount=(width)=>{
        const {columnWidth,gutter}=this.state

        this._columnCount=Math.floor(width/(columnWidth+gutter));
    }

    _resetCellPositioner=()=>{
        const {columnWidth,gutter}=this.state

        this._cellPositioner.reset({
            columnWidth:columnWidth,
            columnCount:this._columnCount,
            spacer:gutter
        })
    }

    _onResize=({width})=>{
        this._getCollumnCount(width);
        this._resetCellPositioner();
        this._masonry.recomputeCellPositions();
    }


    _cellRenderer=({index,key,parent,style})=>{
        const {columnWidth,height}=this.state
        const {drugs,onDrugClick,onAddCart}=this.props
        let drug=drugs[index]

        return (
            <CellMeasurer cache={this._cache} key={key} index={index} parent={parent}>
                    <div  style={{...style,width:columnWidth,height:height}}>
                                <div className="sp-drug" >
                                    <div id="image-container" onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                        <Label size='mini' color='teal' tag>৳&nbsp;{drug['PRICE']}</Label>
                                        <Image size='small' src={drug['IMAGE_SRC']}/><br/>
                                        <Label className="name">{drug['DRUG_NAME']}</Label>
                                    </div>
                                    <Button size='tiny' color='teal' onClick={()=>onAddCart(drug["DRUG_ID"]) } icon='cart'></Button>
                                </div>    
                    </div>
            </CellMeasurer>
        )
    }


    render() {
        const {drugs}=this.props     
        return (
            <div className="specific-container">
              <WindowScroller >
                {({ height, scrollTop }) => (
                <AutoSizer
                    disableHeight
                    height={height}
                    onResize={this._onResize}
                    overscanByPixels={0}
                    scrollTop={scrollTop}
                >
                    {({ width }) => (
                    <Masonry
                        autoHeight
                        cellCount={drugs.length}
                        cellMeasurerCache={this._cache}
                        cellPositioner={this._cellPositioner}
                        cellRenderer={this._cellRenderer}
                        height={height}
                        overscanByPixels={0}
                        ref={(ref)=>this._masonry=ref}
                        scrollTop={scrollTop}
                        width={width}
                    />
                    )}
                </AutoSizer>
                )}
           </WindowScroller>
            </div>
        )
    }
}
