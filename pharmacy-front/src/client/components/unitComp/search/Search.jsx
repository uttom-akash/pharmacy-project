import React, { Component } from 'react'
import {Search,Label} from 'semantic-ui-react'

const resultRenderer=({title})=><Label>{title}</Label>;

export default class SearchCom extends Component {
    state={
        query:'',
        isLoading:false,
    }  

    onResultSelect=(e,{result})=>this.props.selectResult(e,{result})
    

    onSearchQueryChange = (e,{value}) => {
        value=value.trim()
        this.setState({ query: value });

        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
            if(value.length){
                this.setState({isLoading:true})
                this.props.queryChange(value).then(res=>this.setState({isLoading:false}));
            }
        },1000);
    }

    
    
    render() {
        const {query,isLoading}=this.state
        const {options,resultRenderer}=this.props;
        return (   
        <Search
            size='tiny'
            loading={isLoading}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.onSearchQueryChange}
            results={options}
            value={query}
            resultRenderer={resultRenderer}
        />
     
        )
    }
}
