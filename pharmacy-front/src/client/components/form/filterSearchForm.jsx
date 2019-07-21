import React from 'react'
import {Form,Input,Button,Dropdown,Message} from 'semantic-ui-react'
import api from '../api/Api'
import {connect} from 'react-redux'
import {getFilterSearchDrugs} from '../action/DrugsAction'
import Modal from '../unitComp/modal  basic/Modal'


class FilterSearch extends React.Component {
    state = {  
        categories:[],
        catId:[],
        catApi:{},
        catOptions:[],
        searchQuery:'',
        isCatFetching:false,

        brandsOptions:[],
        brand:"",
        brandQuery:"",
        isBrandFetching:false,

        minPrice:'',
        maxPrice:'',

        noResult:false,
        loading:false
        
    }


    handleCategoriesChange=(e,{value})=>{
        let catId=[]
        value.map(val=>catId.push(this.state.catApi[val]))
        this.setState({categories:value,catId})
    }


    handleSearchChange=(e,{searchQuery})=> {
    
        clearTimeout(this.timer);
        this.setState({searchQuery});

        this.timer=setTimeout(()=>{
            if(searchQuery.length){
                this.setState({isCatFetching:true})
                api.getCategories({squery:searchQuery}).then(res=>{
                    let catApi={};
                    let list=res.map(cat=>{
                       catApi[cat['CATEGORY_NAME']]=cat['CATEGORY_ID'];
                       return {key:cat['CATEGORY_ID'],text:cat['CATEGORY_NAME'],value:cat['CATEGORY_NAME']}
                    });
                    
                    this.setState({isCatFetching:false,catOptions:list,catApi})
                })
            }
        },1000);
    }
    handleBrandsChange=(e,{value})=>this.setState({brand:value})

    handleBrandSearchChange=(e,{searchQuery})=> {
    
        clearTimeout(this.timer);
        this.setState({brandQuery:searchQuery});

        this.timer=setTimeout(()=>{
            if(searchQuery.length){
                this.setState({isBrandFetching:true})
                api.getBrands({brand:searchQuery}).then(res=>{
                    let list=res.map(cat=>({key:cat['BRAND'],text:cat['BRAND'],value:cat['BRAND']}));
                    this.setState({isBrandFetching:false,brandsOptions:list})
                })
            }
        },1000);
    }
    

    
    onChange=(event)=>this.setState({[event.target.name]:event.target.value})

    onSubmit=()=>{
        const {catId,minPrice,maxPrice,brand}=this.state

        this.setState({loading:true})
        this.props.getFilterSearchDrugs({categories:catId,minPrice,maxPrice,brand})
                    .then(res=>{
                        if(!(!!res.payload.length))this.setState({noResult:true,loading:false})
                        else {
                            this.setState({noResult:false,loading:false})
                            this.props.onRoute('/filter-search')
                        }
                        this.props.toggle();
                    })
                    .catch(err=>{}) 

    }

    render() { 

        const {modal,toggle}=this.props
        const {noResult,loading,categories,catOptions,isCatFetching,minPrice,maxPrice,brandsOptions,brand,isBrandFetching}=this.state        
        return (
        <Modal modal={modal} onToggle={toggle} basic={false}>
            <Form onSubmit={this.onSubmit} loading={loading}>
                    <Input size="large" label="Min Price" name="minPrice" value={minPrice} placeholder={'min Price'} onChange={this.onChange}/><br/>
                    <Input size="large" label="Max Price" name="maxPrice" value={maxPrice} placeholder={'max Price'} onChange={this.onChange}/><br/>

                    <Dropdown
                        selection
                        multiple={true}
                        search={true}
                        options={catOptions}
                        value={categories}
                        placeholder='add categories'
                        onChange={this.handleCategoriesChange}
                        onSearchChange={this.handleSearchChange}
                        disabled={isCatFetching}
                        loading={isCatFetching}
                        label={'categories'}
                    />

                     <Dropdown
                        selection
                        search={true}
                        options={brandsOptions}
                        value={brand}
                        placeholder='brands'
                        onChange={this.handleBrandsChange}
                        onSearchChange={this.handleBrandSearchChange}
                        disabled={isBrandFetching}
                        loading={isBrandFetching}
                        label={'brand'}
                    />
                    {noResult && <Message error header="sorry. No Drugs available by your filtering"/>}
                    <Button>submit</Button>
            </Form>
            {noResult && <Message error header="sorry. No Drugs available by your filtering"/>}        
         </Modal>)    
    }
}


export default connect(null,{getFilterSearchDrugs})(FilterSearch);