import React, { Component } from 'react'
import SearchCom from './Search'
import api from '../../api/Api'
import {Label} from 'semantic-ui-react'

const resultRenderer=({title})=><Label>{title}</Label>;

export default class ProductSearch extends Component {
    state={
        options:[]
    }

    selectResult=(e,{result})=>this.props.selectProduct({'product':result['id']});
    
    queryChange=(query)=>api.searchProduct({name:query}).then(res=>this.setState({options:res['List']}));
    
    
    render() {
        const {options}=this.state
        return (
            <SearchCom query='name' queryChange={this.queryChange} selectResult={this.selectResult} options={options}/>
        )
    }

}
