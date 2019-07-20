import React, { Component } from 'react'
import Chart from 'chart.js'
import randomColor from 'randomcolor'

export default class PurePieChart extends Component {
    constructor(props){
        super(props)
        this.ref=React.createRef()
    }


    getColor=(options)=>randomColor(options)

    componentDidMount=()=>{
        this.pieChart=new Chart(this.ref.current,{
            type:'doughnut',
            data:{
                labels:['a','b','c'],
                datasets:[
                    {
                        label:'Trending Drugs',
                        data:[10,30,60],
                        backgroundColor:this.getColor({count:3,hue:'purple'})
                    }
                ]
            },
            options:{
                maintainAspectRatio:false
            }
        })
    }

    componentDidUpdate=()=>{
        this.pieChart.data.labels=['a','b','c']
        this.pieChart.data.datasets[0].data=[10,50,40]
        this.pieChart.update()
    }

    render() {
        return (
            <canvas ref={this.ref}/>
        )
    }
}
