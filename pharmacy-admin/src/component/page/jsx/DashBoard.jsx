import React, { Component } from 'react'
import '../css/DashBoard.css'
import api from '../../api/Api'

import {Doughnut} from 'react-chartjs-2'
import randomcolor from 'randomcolor'



export default class DashBoard extends Component {
    state={
		sales:[],
		salesDrugs:[],
		count:""
    }

    componentWillMount=()=>{
		api.drugSales().then(result=>result['List']).then(list=>api.userCount().then(result=>this.setState({sales:list,count:result['count']})))

	}
	

	getChart=(labels,data,title)=>{
		let color=randomcolor({
				count: labels.length,
				hue: 'green'
			 });			 

		return	(<Doughnut
					data={{
						labels:labels,
						datasets:[{
							data:data,
							backgroundColor:color,
							hoverBorderColor:color,
							hoverBorderWidth:2,
							
						}]
					}}
					options={{
						cutoutPercentage:60,
						animation:{
							animateScale:true
						},
						title:{
							display:true,
							text:title
						}
					}}
				/>)
	}


    render() {
		const {sales,count}=this.state;
        return (
            <div className="dashboard">
                    <div className="drugs-sales">
						{this.getChart(sales.map(sale=>sale['DRUG_NAME']),sales.map(sale=>sale['cnt']),"Drug Sales per Drug")}
					</div>
                    <div className="brand">
					{this.getChart(sales.map(sale=>sale['BRAND']),sales.map(sale=>sale['cnt']),"Drug Sales per Brand")}
					</div>

					{/* <div className="user-count">
						<h3>Total User</h3>
						<label>{count}</label>
					</div> */}
						{/* <div className="drugs-count"></div>
						<div className="employee-count"></div>
						<div className="total-sale"></div> */}
                    
            </div>
        )
    }
}