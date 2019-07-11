import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import FileInput from '../../comp/form/FileInput'
import '../css/UserForm.css'
import '../css/NewSupply.css'
import api from '../../api/Api'

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

        clearTimeout(this.timeOut);

        this.settingDrugs(ev.target.name,ev.target.value,index);
        

        if(this.input==='name'){

        this.timeOut=setTimeout(()=>
            api.isDrug({drugName:this.drugName}).then(res=>{
                if(res['id']!=="-1"){
                    this.settingDrugs("drugID",res['id'],this.index);
                }
                else alert("this drug is not available,please insert drug first")
            }),2000)
        }
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

        if(Object.keys(error).length === 0) {
                    this.setState({ loading: true });
                    this.props.onSubmit(this.state).then(user=>{
                                                    this.setState({ loading: false})
                                                    this.props.toggle();
                                                }).catch(err => {
                                                    error.global = err;
                                                    this.setState({ loading: false, error });
                                                });
        }
    };

    onValidate = () => {
        const { supplierName,supplierID} = this.state;
        let error = {};
        if (!supplierName) error.password = "supplier name cant blank..";
        if (!supplierID) error.phoneNumber = "supplier is not valid..";

        return error;
    };

    onSupplierChange=(ev)=>{
        this.name=ev.target.value;
        
        this.setState({ [ev.target.name]: ev.target.value });
  
        
        clearTimeout(this.timeOut);

        this.timeOut=setTimeout(()=>
        api.isSupplier({supplierName:this.name}).then(res=>{
            if(res['id']!=="-1")this.setState({ supplierID: res['id']});
            else alert("this supplier is not available,please insert supplier first")
        }),2000)


        
    }

    
    render() {
        const {supplierName,supplyDate,drugs}=this.state
        return (
            <div className="user-form">
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Supplier Name" name="supplierName" value={supplierName} onChange={this.onSupplierChange}/>
                <input type="text" placeholder="Supply Date" name="supplyDate" value={supplyDate} onChange={this.onChange}/>
                
                {
                    drugs.map((drug,index)=>
                        <div className="drug">
                            <input type="text" placeholder="Drug Name" name="name" value={drug.name} onChange={(ev)=>this.onDrugChange(ev,index)}/>
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
