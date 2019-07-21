import React, { Component } from 'react'
import {CellMeasurer,CellMeasurerCache,createMasonryCellPositioner,Masonry,AutoSizer,WindowScroller} from 'react-virtualized'
import './SpecificDrugs.css'
import {Image,Label,Button} from 'semantic-ui-react'
import SearchCom from '../search/Search'
import LoadingMessage from '../../unitComp/alert/LoadingMessage'
import {checkoutToggleAction,loginToggleAction} from '../../action/UniverseAction'
import {connect} from 'react-redux'
import ConfirmUi from '../confirmUI/ConfirmUI'
class SpecificDrugs extends Component {

    constructor(props){
        super(props)
        this.state={
            columnWidth:300,
            height:300,
            gutter:10,
            drugs:[],

            confirm:false,
            loading:false,
            message:'',
            notUser:false

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
        const {columnWidth,height,drugs}=this.state
        const {onDrugClick}=this.props
        const len=drugs.length
        let drug=drugs[index%len]
        
        return (
            <CellMeasurer cache={this._cache} key={key} index={index} parent={parent}>
                    <div  style={{...style,width:columnWidth,height:height}}>
                                {!!drug && <div className="sp-drug" >
                                    <div id="image-container" onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                        <Label size='mini' color='teal' tag>৳&nbsp;{drug['PRICE']}</Label>
                                        <Image size='small' src={drug['IMAGE_SRC']}/><br/>
                                        <Label className="name">{drug['DRUG_NAME']}</Label>
                                    </div>
                                    <Button.Group>
                                            <Button size='tiny' color='teal' onClick={()=>this.onAddCart(drug) } icon='cart'/>
                                            <Button.Or/>
                                            <Button size='tiny' color='teal' onClick={()=>this.onAddOrder({name:drug['DRUG_NAME'],price: drug['PRICE'],drugID:drug["DRUG_ID"],discount:drug['DISCOUNT']}) }>add to order</Button>        
                                    </Button.Group>
                                </div>}    
                    </div>
            </CellMeasurer>
        )
    }

    // search
    selectResult=(e,{result})=>{}

    queryChange=(value)=>new Promise(resolve=>{
        const {drugs}=this.props;
        let re=new RegExp(`^${value}.*`,'i')
        
        if(!!drugs.length){
            let selectedDrugs=drugs.filter(catDrugs=>{
                if(!!re.exec(catDrugs['DRUG_NAME']))return  true;
                return false
            }) 
            this.setState({drugs:selectedDrugs})
            resolve();
        }   
    },reject=>{})
 
    
    // cart
    
    onAddOrder=(drug)=>{
        const {userID,onAddOrder}=this.props
        if(!!userID){
                onAddOrder(drug);
        }else{
            this.setState({notUser:true})
        }
    }

    onAddCart=(drug)=>{
        const {onAddCart,userID}=this.props
        if(!!userID){
            this.setState({loading:true})
            onAddCart(drug).then(res=>this.alertMessage('Add successfully ..')).catch(err=>this.alertMessage('This drugs already in cart..'))
        }else{
            this.setState({notUser:true})
        }
    }

    alertMessage=(message)=>{
        this.setState({loading:false,confirm:true,message})
    }

    onCheckout=()=>{
        this.setState({confirm:false})
        this.props.checkoutToggleAction()
    }

    onContinue=()=>this.setState({confirm:false})

    onLogin=()=>{
        this.setState({notUser:false})
        this.props.loginToggleAction()
    }


    render() {
        const {drugs,loading,message,confirm,notUser}=this.state
             
        return (
            <div className="specific-container">
               <SearchCom
                    queryChange={this.queryChange}
                    selectResult={this.selectResult}

                    resultRenderer={({title})=><Label>{title} Results shown below..</Label>}
                    options={[{title:drugs.length.toString()}]}
                />  

            <LoadingMessage visiblity={!loading} text={'Adding ...'}/>
            <ConfirmUi open={confirm} text={message} click1={this.onCheckout} click2={this.onContinue} btn1={'checkout'} btn2={'continue'}/>
            <ConfirmUi open={notUser} text={"You are not loggedin ..."} click1={this.onLogin} click2={()=>this.setState({notUser:false})} btn1={'login'} btn2={'Cancel'}/>
               
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

const mapStateToProps=state=>({
    userID:state.User.USER_ID
})

export default connect(mapStateToProps,{checkoutToggleAction,loginToggleAction})(SpecificDrugs);