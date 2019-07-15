import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Form,Label,Button} from 'semantic-ui-react'
import Table from '../unitComp/table/Table'
import {getCart} from '../action/DrugsAction'

class ChooseItems extends Component {
    
    state={
        list:[],
        listIndex:['name'],
    }
    
    componentDidMount=()=>{

        this.props.getCart({userID:this.props.userID}).then(res=>{
                const {cartList}=this.props
                let list=cartList.map(drug=>({name:drug['DRUG_NAME'],drugID:drug['DRUG_ID'],price:drug['PRICE'],status:false}))           
                this.setState({list});
        });
    }

    checkToggle=(drugID)=>{
        const {list}=this.state;
        let listcopy=list.map(drug=>{
            if(drugID===drug['drugID']) return{...drug,status:!drug['status']}
            else return drug;   
        })

        this.setState({list:listcopy})
    }
    
    onSubmit=(ev)=>{

        ev.preventDefault();
        let {list}=this.state;
        let vouchar=[]
        vouchar=list.filter(drug=>drug.status)
        this.props.onSubmit(vouchar);
        this.props.toggle();
    
    }

    onCancel=(ev)=>{
        this.props.onSubmit([],0)
    }



    render() {
        const {list,listIndex,total}=this.state;
        return (
            <Form>
                <Table list={list} listIndex={listIndex} header={listIndex} checkKey='drugID' checkToggle={this.checkToggle}></Table>
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
export default  connect(mapStateToProps,{getCart})(ChooseItems)