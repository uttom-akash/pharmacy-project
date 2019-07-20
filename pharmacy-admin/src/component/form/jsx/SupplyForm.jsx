import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import '../css/UserForm.css'
import '../css/NewSupply.css'
import api from '../../api/Api'
import SupplierSearch from '../../comp/search/SupplierSearch'
import ProductSearch from '../../comp/search/ProductSearch'

export default class SupplyForm extends Component {

    state={
        supplierName:"",
        supplyDate:"",
        drugs:[]
    }

    onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    onfileChange=({profilePicture,pictureName})=>this.setState({profilePicture,pictureName})

    settingDrugs=(name,value,index)=>{
        let drugs=this.state.drugs.slice(0);
        let drug={...drugs[index],[name]:value}
        drugs[index]=drug;
        this.setState({drugs})

    }

    onDrugChange=(ev,index)=>{
        this.drugName=ev.target.value
        this.input=ev.target.name
        this.index=index

        this.settingDrugs(ev.target.name,ev.target.value,index);
    }

    onDrugAdd=({product})=>{
        clearTimeout(this.timeOut);
        this.timeOut=setTimeout(()=>
        api.isDrug({drugID:product}).then(res=>{
            if(res['id']!=="-1"){
                this.settingDrugs("drugID",res['id'],this.index);
            }
            else alert("this drug is not available,please insert drug first")
        }),2000)
        
    }

    onRemove=(index)=>{
        let drugs=this.state.drugs.slice(0);

        drugs.splice(index,1)

        this.setState({drugs});
    
    }

    onAdd=()=>{
        let drugs=this.state.drugs.slice(0);

        drugs.push({name:"",quantity:'',price:''})

        this.setState({drugs});
    }
    
    
    

    onSubmit = ev => {
        ev.preventDefault();

        let error = {};
        error = this.onValidate();
        this.setState({ error });
        console.log(this.state);
        
        if(Object.keys(error).length === 0) {
                    this.setState({ loading: true });
                    this.props.onSubmit(this.state).then(user=>this.setState({ loading: false})).then(res=>this.props.toggle()).catch(err => {
                                                    error.global = err;
                                                    this.setState({ loading: false, error });
                                                });
        }
    };

    onValidate = () => {
        const { supplierID,supplyDate} = this.state;
        let error = {};
        if (!supplyDate) error.password = "supplier name cant blank..";
        if (!supplierID) error.phoneNumber = "supplier is not valid..";

        return error;
    };

    onSupplierChange=({supplier})=>{
        console.log(supplier);
        
        clearTimeout(this.timeOut);

        this.timeOut=setTimeout(()=>
        api.isSupplier({supplierID:supplier}).then(res=>{
            if(res['id']!=="-1")this.setState({ supplierID:supplier});
            else alert("this supplier is not available,please insert supplier first")
        }),2000)        
}

    
    render() {
        const {supplierName,supplyDate,drugs}=this.state
        return (
            <div className="user-form">
            <form onSubmit={this.onSubmit}>
                <SupplierSearch selectSupplier={this.onSupplierChange}/>            
                <input type="text" placeholder="Supply Date" name="supplyDate" value={supplyDate} onChange={this.onChange}/>
                
                {
                    drugs.map((drug,index)=>
                        <div className="drug">
                            <ProductSearch selectProduct={this.onDrugAdd}/>
                            {/* <input type="text" placeholder="Drug Name" name="name" value={drug.name} onChange={(ev)=>this.onDrugChange(ev,index)}/> */}
                            <input id="qty" type="text" placeholder="Quantity" name="quantity" value={drug.quantity} onChange={(ev)=>this.onDrugChange(ev,index)}/>
                            <input id="price" type="text" placeholder="Price" name="price" value={drug.price} onChange={(ev)=>this.onDrugChange(ev,index)}/>
                            <label>{drug.quantity*drug.price}</label>        
                            <div id="ar" color={'gray'} onClick={()=>this.onRemove(index)}>-</div>
                        </div>
                    )
                }
                <div id="ar" color={'gray'} onClick={()=>this.onAdd()}>+</div>
                <Button color={'green'} style={{width:"7rem"}}>Submit</Button>
                </form>
            </div>
        )
    }
}
