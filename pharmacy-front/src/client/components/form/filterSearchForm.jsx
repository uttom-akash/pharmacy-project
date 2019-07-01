import React from 'react'
import {Input,InputGroup,InputGroupAddon,CustomInput} from 'reactstrap'
import api from '../api/Api'
import Modal from '../unitComp/modal/Modal'
import Button from '../unitComp/button/Button'
// import '../css/FilterSearch.css'


class FilterSearch extends React.Component {
    state = {  
        categories:[],
        brands:[],
        catDrop:false,
        price:0,
        brand:""
    }
    
    componentWillMount=()=>{
        api.getCategories().then(categories=>categories.map(category=>({id:category['CATEGORY_ID'],name:category['CATEGORY_NAME'],status:false})))
                           .then(categories=>this.setState({categories}))

        api.getBrands()
                    .then(brands=>brands.map(brand=>({name:brand['BRAND'],status:false})))
                    .then(brands=>this.setState({brands}))

    }

    catDropToggle=()=>this.setState({catDrop:!this.state.catDrop})
    
    onCatStatusChange=(id)=>{
        this.setState({categories:this.state.categories.map(category=>{
            if(category['id']===id) return {id:category['id'],name:category['name'],status:!category['status']}
            else                    return {id:category['id'],name:category['name'],status:category['status']}
        })})
    }

    onChange=(event)=>this.setState({[event.target.name]:event.target.value})


    onSubmit=()=>{
        const {categories,brand,price}=this.state
        let selectedCat=categories.filter((category)=>category['status'])
        selectedCat=selectedCat.map(cat=>cat['id'])
       
        this.props.onRoute(`/filter-search/${selectedCat}/${brand}/${price}`)
        // import {getFilterSearchDrugs} from '../action/DrugsAction'
        
        // this.props.getFilterSearchDrugs({category:selectedCat,brand,price})
        //           .then(res=>)
        //           .catch(err=>console.log(err))

    }

    render() { 
        const {modal,toggle}=this.props
        const {catDrop,categories,brands,price,brand}=this.state
        return (
        <Modal modal={modal} toggle={toggle}>
            
            <InputGroup>
                <InputGroupAddon addonType="prepend">Price</InputGroupAddon>
                <Input type="number" value={price} onChange={this.onChange} name="price"/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Brand</InputGroupAddon>
                <select value={brand} onChange={this.onChange} name="brand">
                { brands.map(brand=><option value={brand['name']}>{brand['name']}</option>)}
            </select>
            </InputGroup>
            
            <Input type="text" placeholder="click to select category" onClick={this.catDropToggle}/>
            <Modal modal={catDrop} toggle={this.catDropToggle}>
                    {
                        categories.map(category=>
                            <React.Fragment>
                                    <div onClick={()=>this.onCatStatusChange(category['id'])}>
                                    <CustomInput type="checkbox" checked={category['status']} onChange={this.onCatStatusChange} label={category['name']}></CustomInput>
                                    </div>
                                    <hr/>
                            </React.Fragment>
                        )
                    }
                    <Button onClick={this.catDropToggle} text="ok"/>        
            </Modal>
            <div className="selected-cat">
               <label>Selected :</label>
               {
                   categories.map(category=>category['status'] && <label>#{category['name']}</label>)
               }
            </div>
            
            <Button onClick={this.onSubmit} text="submit"/>
        </Modal>)    
    }
}
 
export default FilterSearch;