import React, { Component } from 'react'
import {Segment,Input,Button,Dimmer,Loader,Menu,Icon,Label,Form} from 'semantic-ui-react'
import api from '../../api/Api';
import {setDate} from '../../comp/date/Date'
import SearchCom from '../../comp/search/Search'
import Lazylisting from '../../comp/data/Lazylisting';

const resultRenderer=({title})=><Label>{title}</Label>;

export default class DrugStates extends Component {
    state={
        loading:false,
        listIndex:['DRUG_NAME','BRAND','REMAIN_QTY','SUPPLIER_PRICE','EXP_DATE','MFG_DATE','SUPPLIER_NAME','MOBILE_NO'],
        header:['Drug','Manufacturer','Quantity','Supply Price','Expire Date','Mfg Date','Supplier','Supplier Contact'],
        options:[],
        showOptions:[],
        limit:1749,
        
        quantity:'',
        
        startExpire:'',
        endExpire:''

    }

    getData=(offset)=>{
        const {limit}=this.state
        return api.drugStatesReport({offset,limit}).then(res=>this.setState({options:this.state.options.concat(res['list']),showOptions:this.state.options.concat(res['list'])}))
    }

    componentWillMount=()=>{
        this.getData(0)
    }

   selectResult=(result)=>{}
   
   queryChangeByName=(value)=>
   new Promise(resolve=>{        
       const {options}=this.state
       let re=new RegExp(`^${value}.*`,'i')
       
       if(!!options.length && !!value.length){
           let seleceted=options.filter(option=>{
               if(!!re.exec(option['DRUG_NAME']))return  option;
           })
           this.setState({showOptions:seleceted})
           
       }else{
        this.setState({showOptions:options})
       }
       resolve();
   },reject=>{}) 
   
   

   queryChangeByQuantity=()=>{
        const {quantity,options}=this.state
        
        if(!!quantity){
            let selected=options.filter(option=>parseInt(option['REMAIN_QTY'],10)<=parseInt(quantity,10))
            this.setState({showOptions:selected}) 
        }else{
            this.setState({showOptions:options})
        }
   }


   queryChangeByExpire=()=>{
    const {startExpire,endExpire,options}=this.state
    let start=startExpire,end=endExpire

    
        if(!!start===false)start=new Date()
        
        if(!!end){
            let selected=options.filter(option=>new Date(start)<=new Date(option['EXP_DATE']) && new Date(option['EXP_DATE'])<=new Date(end))
            this.setState({showOptions:selected})
        }else{
            this.setState({showOptions:options})
        }
   }

    onChange=(e)=>this.setState({[e.target.name]:e.target.value})
    

    render() {
        const {loading,listIndex,header,showOptions,quantity,startExpire,endExpire}=this.state
        
        return (<div>
            <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>               
                    <Segment>
                        <Label>Search by Name </Label>
                        <SearchCom options={[{'title':`${showOptions.length}results shown bellow`}]} selectResult={this.selectResult} queryChange={this.queryChangeByName} query='DRUG_NAME' resultRenderer={resultRenderer}/>     
                    </Segment>
                    
                    <Segment>
                        <Label>Search by Quantity </Label><br/>
                        <Input size='mini' name={'quantity'} value={quantity} onChange={this.onChange}/>
                        <Button size='mini' onClick={this.queryChangeByQuantity}>Set</Button>          
                    </Segment>
                    
                    <Segment>
                        <Label>Search by Expire </Label><br/>
                        Start <Input size='mini' name={'startExpire'} value={startExpire} onChange={this.onChange}/>
                        End   <Input size='mini' name={'endExpire'} value={endExpire} onChange={this.onChange}/>
                        <Button size='mini' onClick={this.queryChangeByExpire}>Set</Button>
                    </Segment>

                    <Lazylisting list={showOptions} listIndex={listIndex} header={header}/>
            </Segment>
        </div>)
    }
}
