import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Form,Label,Button} from 'semantic-ui-react'
import Table from '../unitComp/table/Table'

class ChooseItems extends Component {
    
    state={
        list:[],
        listIndex:['name','quantity','price','total'],
        header:['name','quantity','price','total'],
        total:0
    }
    
    componentDidMount=()=>{
        const {cartList}=this.props
        let list=[]
        cartList.map(drug=>list[drug['DRUG_ID']]={name:drug['DRUG_NAME'],status:false,quantity:0,price:drug['PRICE'],total:0,drugID:drug['DRUG_ID']})
        this.setState({list});
    }

    
    onIncDec=(drugID,op)=>{
        let list=this.state.list.slice(0)
        if(list[drugID].quantity+1*op>=0){
            list[drugID].quantity=list[drugID].quantity+1*op;
            list[drugID].total=list[drugID].quantity*list[drugID].price;
            this.state.total=this.state.total+list[drugID].price*op;
        }
            this.setState({list,total:this.state.total});
    }

    onInc=(drugID)=>{
        this.onIncDec(drugID,1)
    }


    onDec=(drugID)=>{
        this.onIncDec(drugID,-1)
    }

    
    onSubmit=(ev)=>{

        ev.preventDefault();
        let {list,total}=this.state;
        let vouchar=[]
        
        vouchar=list.filter(drug=>drug.quantity)
        this.props.onSubmit(vouchar,total);
    
    }

    onCancel=(ev)=>{
        this.props.onSubmit([],0)
    }



    render() {
        const {list,listIndex,header,total}=this.state;
        return (
            <Form>
                <Table list={list} listIndex={listIndex} header={header} onClick1={this.onDec} onClick2={this.onInc} clickKey1={'drugID'} clickKey2={'drugID'} clickText1={'-'} clickText2={'+'}>
                    <Label  color='blue' ribbon>Total :{total}</Label>
                </Table>
                <Button.Group>
                        <Button onClick={this.onSubmit}  color='teal'>Confirm</Button><Button.Or/>
                        <Button onClick={this.onCancel} color='red'>Cancel</Button>                     
                </Button.Group>
    
            </Form>
        )
  }
}

const mapStateToProps=state=>({
    cartList:state.Cart
})
export default  connect(mapStateToProps)(ChooseItems)