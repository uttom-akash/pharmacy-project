import React, { Component } from 'react';
import '../css/Home.css'
import Ask from './Ask'
import api from '../../api/Api'
import SearchCom from '../../unitComp/search/Search'
import Carousel from '../../unitComp/carousel/Carousel'

const resultRenderer=({title,price})=><div style={{display:'flex',justifyContent:'space-between'}}>{title}<label style={{color:'#34BA45'}}>{price}</label></div>

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query:"",
            
        }
    }

    // search
    handleSearchResultSelect=(e,{result})=>this.props.history.push(`/Drug/${result['id']}`)

    onSearchChange = (value) =>new Promise(
        resolve=>{
            api.search({query:value}).then(res=>{this.setState({options:res['list']});resolve()})
        },
        reject=>{})

    componentWillMount=()=>{
        api.getTrendingDrugs({date:new Date(),days:-30,limit:9}).then(res=>this.setState({trending:res['drugs']}))
        api.getDiscountedDrugs({limit:12}).then(res=>this.setState({discounted:res['drugs']}))
    }
    
    onDrugClick=(drugID)=>this.props.history.push(`/Drug/${drugID}`)


    render() {
        const {trending,discounted}=this.state
        return (
            <div className="home">
                {/* <Ask/>         */}
                 <SearchCom selectResult={this.handleSearchResultSelect} queryChange={this.onSearchChange} resultRenderer={resultRenderer} options={this.state.options}/>
                <div className='discount'>
                   {!!discounted && <Carousel drugs={discounted} status='Discount' onClick={this.onDrugClick} limit={discounted.length}/>
                   }
                </div>
                
                <div className='discount'>
                   {!!trending && <Carousel drugs={trending} status='Trending' onClick={this.onDrugClick} limit={trending.length}/>
                   }
                </div>

                <div className="map-container">
                    <div id="map"></div>
                </div>   
            </div>
        );
    }
}

export default Home;