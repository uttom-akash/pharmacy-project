import React, { Component } from 'react'
import {CellMeasurer,CellMeasurerCache,createMasonryCellPositioner,Masonry,AutoSizer,WindowScroller} from 'react-virtualized'
import './SpecificDrugs.css'


export default class SpecificDrugs extends Component {

    constructor(props){
        super(props)
        this.state={
            columnWidth:300,
            height:250,
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
                    <div  style={{...style,width:columnWidth,height:height,border:"1px solid #D3D3D3"}}>
                            <div className="sp-drug" >
                                <div id="image-container" onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                    <img src={drug['IMAGE_SRC']}></img><br/>
                                    <label className="price">৳&nbsp;{drug['PRICE']}</label>
                                    <label className="name">{drug['DRUG_NAME']}</label>
                                </div>
                                <div className="add-cart" onClick={()=>onAddCart(drug["DRUG_ID"]) }><i className="fas fa-shopping-cart"></i>+</div>
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
