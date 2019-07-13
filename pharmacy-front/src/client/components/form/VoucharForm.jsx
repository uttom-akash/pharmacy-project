import React, { Component } from 'react'
import ChooseItems from './ChooseItems'
import Modal from '../unitComp/modal  basic/Modal'
import {Form,Button,Label, Segment,Input } from 'semantic-ui-react'
import Table from '../unitComp/table/Table'
import api from '../api/Api'

export default class VoucharForm extends Component {
    
    constructor(props){
        super(props)

        this.state={
            total:0,
            header:["name","quantity","price"],
            list:{},
            selectedlist:[],
            modal:false,
            address:"nurani 6,subidbazar",
            contactNumber:'0000000000',
            date:null,
            time:null
        }
    }


    toggle=()=>this.setState({modal:!this.state.modal})
     

    onChoose=(selectedlist,total)=>{
        
        this.setState({selectedlist,total})
        this.toggle();
    }

    
    // onHandleChange=(event)=>[...event.target.options].filter(({selected})=>selected).map(({value})=>console.log(value))
    onChange=(event)=>this.setState({[event.target.name] :event.target.value});
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        const {total,selectedlist}=this.state;
        const {userID,address,contactNumber}=this.props
        api.confirmOrder({userID,address,contactNumber,totalPrice:total,list:selectedlist}).then(res=>
            {
                this.props.toggle()
                
            })        
    }

    onCancel=(ev)=>{
        ev.preventDefault();
        this.props.toggle()
    }

    render() {
        const {selectedlist,header,total,address,contactNumber,date,time}=this.state;
    return (
            <Form>
                <Segment  style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Chooser</Label><br/><br/>
                        <Button  size='small' color='teal' onClick={this.toggle} label={'Choose from cart'}></Button>
                        <Modal modal={this.state.modal} onToggle={this.toggle} basic={false}>
                                <ChooseItems onSubmit={this.onChoose}  list={this.state.list}/>  
                        </Modal>
                </Segment>
                
                <Segment style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Drugs</Label><br/><br/>
                        <Table header={header} list={selectedlist} listIndex={header}><Label as='a' size='mini' color='teal' ribbon>Total :{total}</Label></Table>
                </Segment >
                <Segment style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Info</Label><br/><br/>
                        <Label>Duration : <Label.Detail>{'40min'}</Label.Detail></Label><br/>
                        <Label>Address  : <Input type="text" name="address" value={address}  onChange={this.onChange}/> </Label><br/>
                        <Label>Number   : <Input type="text" name="contactNumber" value={contactNumber} onChange={this.onChange}/> </Label><br/>
                        
                </Segment>
                       
                <Segment style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Payment</Label><br/><br/>
                        <Label>Cash on Delivary</Label><br/>
                </Segment>
                <Button.Group>
                        <Button onClick={this.onSubmit}  color='teal'>Confirm</Button><Button.Or/>
                        <Button onClick={this.onCancel} color='red'>Cancel</Button>                     
                </Button.Group>
    
            </Form>
    )
  }
}
