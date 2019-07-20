import React, { Component } from 'react'
import {Segment,Input,Button,Dimmer,Loader,Accordion,Icon,Label,Form} from 'semantic-ui-react'
import api from '../../api/Api';
import {ymd,setDate} from '../../comp/date/Date'
import SearchCom from '../../comp/search/Search'
import Listing from '../../comp/data/Listing'

const resultRenderer=({title})=><Label>{title}</Label>;

export default class SalesReport extends Component {
    state={
        loading:false,
        activeIndex:-1,
        listIndex:['title','mrp_price','sup_price'],
        header:['Name','Sales Price','Supplier Price'],
        options:[],
        date:'',
        days:''
    }

    getData=(index)=>{
        let date=!!this.state.date ? this.state.date :ymd()
        let days=!!this.state.days ? this.state.days :-30
           
        switch(index){
                case 0:api.salesProduct({date,days}).then(res=>this.setState({options:res['list']}))
                break
                case 1:api.salesUser({date,days}).then(res=>this.setState({options:res['list']}))                
                break
                case 2:api.salesEmployee({date,days}).then(res=>this.setState({options:res['list']}))                
                break
                case 3:api.salesManufacturer({date,days}).then(res=>this.setState({options:res['list']}))                
                break
                case 4:api.salesSupplier({date,days}).then(res=>this.setState({options:res['list']}))                
        }
    }

    onCheckTick=(index)=>{
        
        if(this.state.activeIndex!==index){
            this.getData(index)            
        }   
        this.setState({activeIndex: index===this.state.activeIndex ? -1: index})                 
}

   selectResult=(result)=>{}
   
   queryChange=(value)=>
            new Promise(resolve=>{        
                const {options}=this.state
                let re=new RegExp(`^${value}.*`,'i')
                
                if(!!options.length){
                    let seleceted=options.filter(option=>{
                        if(!!re.exec(option['title']))return  option;
                    })
                    this.setState({options:seleceted})
                    resolve();
                }   
            },reject=>{})
        


    onChange=(e)=>this.setState({[e.target.name]:e.target.value})
    onSet=(e)=>{
        e.preventDefault()
        this.getData(this.state.activeIndex)        
    }
    render() {

        const {loading,activeIndex,options,listIndex,header,date,days}=this.state
        
        return (<div>
            <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Form onSubmit={this.onSet}>
                        <Button onClick={this.onSet}>Set</Button>
                        <Input name={'date'} value={date} label='Date' onChange={this.onChange} placeholder='yyyy-mm-dd'/>
                        <Input name={'days'} value={days} label='Days' onChange={this.onChange}/>
                    </Form>
                    <Accordion styled fluid>
                            <Accordion.Title  active={activeIndex === 0} index={0} onClick={()=>this.onCheckTick(0)}><Icon name='dropdown'/>Salse Over Product</Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                               <SearchCom options={[{'title':'results shown bellow'}]} selectResult={this.selectResult} queryChange={this.queryChange} query='name' resultRenderer={resultRenderer}/>     
                               <Listing list={options} listIndex={listIndex.concat(['quantity','brand'])} header={header.concat(['Quantity','Manfacturer'])}/>  
                        </Accordion.Content>

                            <Accordion.Title  active={activeIndex === 1} index={1} onClick={()=>this.onCheckTick(1)}><Icon name='dropdown'/>Sales Over User</Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                            <SearchCom options={[{'title':'results shown bellow'}]} selectResult={this.selectResult} queryChange={this.queryChange} query='name' resultRenderer={resultRenderer}/>     
                            <Listing list={options} listIndex={listIndex} header={header}/> 
                        </Accordion.Content>
                            
                            <Accordion.Title  active={activeIndex === 2} index={2} onClick={()=>this.onCheckTick(2)}><Icon name='dropdown'/>Sale By Employee</Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                            <SearchCom options={[{'title':'results shown bellow'}]} selectResult={this.selectResult} queryChange={this.queryChange} query='name' resultRenderer={resultRenderer}/>     
                            <Listing list={options} listIndex={listIndex} header={header}/> 
                         </Accordion.Content>
                            
                            <Accordion.Title  active={activeIndex === 3} index={3} onClick={()=>this.onCheckTick(3)}><Icon name='dropdown'/>Sales over Manufacturer</Accordion.Title>
                            <Accordion.Content active={activeIndex === 3}>
                            <SearchCom options={[{'title':'results shown bellow'}]} selectResult={this.selectResult} queryChange={this.queryChange} query='name' resultRenderer={resultRenderer}/>     
                            <Listing list={options} listIndex={listIndex.concat(['quantity'])} header={header.concat(['Quantity'])}/> 
                         </Accordion.Content>

                            <Accordion.Title  active={activeIndex === 4} index={4} onClick={()=>this.onCheckTick(4)}><Icon name='dropdown'/>Sales Over Supplier</Accordion.Title>
                            <Accordion.Content active={activeIndex === 4}>
                            <SearchCom options={[{'title':'results shown bellow'}]} selectResult={this.selectResult} queryChange={this.queryChange} query='name' resultRenderer={resultRenderer}/>     
                            <Listing list={options} listIndex={listIndex.concat(['quantity'])} header={header.concat(['Quantity'])}/> 
                         </Accordion.Content>
                    </Accordion>
            </Segment>
        </div>)
    }
}
