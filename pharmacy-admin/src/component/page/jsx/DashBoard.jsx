import React, { Component } from 'react'
import '../css/DashBoard.css'
import SalesLineChart from '../../comp/chart/line/SalesLineChart'
import ProfitLineChart from '../../comp/chart/line/ProfitLineChart'
import TrendingDrugs from '../../comp/chart/pie/TrendingDrugs'
export default class DashBoard extends Component {
    state={
	
	}


    onViewReport=(path)=>this.props.history.push(path)

    render() {
        return (
            <div className="dashboard">
				<div  className="main-card">
					<SalesLineChart onClick={this.onViewReport}/>
				</div>
				<div  className="main-card">
					<ProfitLineChart onClick={this.onViewReport}/>
				</div>
				<div  className="main-card">
					<TrendingDrugs onClick={this.onViewReport}/>
				</div>
				
            </div>
        )
    }
}