import React, { Component } from 'react'
import {CellMeasurer,CellMeasurerCache,createMasonryCellPositioner,Masonry,AutoSizer,WindowScroller} from 'react-virtualized'
import './SpecificDrugs.css'
import {Image,Label,Button} from 'semantic-ui-react'
import SearchCom from '../search/Search'

export default class SpecificDrugs extends Component {

    constructor(props){
        super(props)
        this.state={
            columnWidth:300,
            height:300,
            gutter:10,
            drugs:[]
        }

        this._columnCount=5
        this._cache=new CellMeasurerCache({
            defaultHeight:300,
            defaultWidth:300,
            fixedWidth:true
        })

        this._cellPositioner=createMasonryCellPositioner({
            cellMeasurerCache:this._cache,
            columnCount:this._columnCount,
            columnWidth:this.state.columnWidth,
            spacer:this.state.gutter
        })
    } 

    componentDidUpdate=(prevProps,prevState)=>{
        console.log(prevState.drugs.length);
        console.log(this.state.drugs.length);
        if(prevState.drugs.length!==this.state.drugs.length){
            console.log('in');
            // this.forceUpdate();
        }
        
        
    }
    
    componentWillMount=()=>{
        const {drugs}=this.props
        this.setState({drugs})
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
        const {onDrugClick,onAddCart,onAddOrder}=this.props
        const {drugs} =this.state;
        let drug=drugs[index]
        console.log("re render");
        
        return (
            <CellMeasurer cache={this._cache} key={key} index={index} parent={parent}>
                    <div  style={{...style,width:columnWidth,height:height}}>
                                <div className="sp-drug" >
                                    <div id="image-container" onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                        <Label size='mini' color='teal' tag>৳&nbsp;{drug['PRICE']}</Label>
                                        <Image size='small' src={drug['IMAGE_SRC']}/><br/>
                                        <Label className="name">{drug['DRUG_NAME']}</Label>
                                    </div>
                                    <Button.Group>
                                            <Button size='tiny' color='teal' onClick={()=>onAddCart(drug["DRUG_ID"]) } icon='cart'/>
                                            <Button.Or/>
                                            <Button size='tiny' color='teal' onClick={()=>onAddOrder({name:drug['DRUG_NAME'],price: drug['PRICE'],drugID:drug["DRUG_ID"]}) }>add to order</Button>        
                                    </Button.Group>
                                </div>    
                    </div>
            </CellMeasurer>
        )
    }

    // search
    selectResult=(e,{result})=>{}

    queryChange=(value)=>new Promise(resolve=>{
        const {drugs}=this.state;
        let re=new RegExp(`^${value}.*`,'i')
        
        if(!!drugs.length){
            let selectedDrugs=drugs.filter(catDrugs=>{
                if(!!re.exec(catDrugs['DRUG_NAME']))return  catDrugs;
            })
            this.setState({drugs:selectedDrugs})
            resolve();
        }   
    },reject=>{})
 
    


    render() {
        const {drugs}=this.state
             console.log('render');
             
        return (
            <div className="specific-container">
               <SearchCom
                    queryChange={this.queryChange}
                    selectResult={this.selectResult}

                    resultRenderer={({title})=><Label>{title} Results shown below..</Label>}
                    options={[{title:drugs.length.toString()}]}
                />  

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
