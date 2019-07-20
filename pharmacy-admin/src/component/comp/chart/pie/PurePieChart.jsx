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
        const {title,label,data}=this.props
        let color1=this.getColor({count:label.length,luminosity: 'light',hue: 'green'})
        let color2=this.getColor({count:label.length,luminosity: 'dark',hue: 'green'})
        this.pieChart=new Chart(this.ref.current,{
            type:'doughnut',
            data:{
                labels:label,
                datasets:[
                    {
                        label:title,
                        data:data,
                        backgroundColor:color1,
                        hoverBackgroundColor:color2
                    }
                ]
            },
            options:{
                maintainAspectRatio:false,
                cutoutPercentage:60
            }
        })
    }

    componentDidUpdate=()=>{

        const {title,label,data}=this.props
        let color1=this.getColor({count:label.length,luminosity: 'light',hue: 'green'})
        
        this.pieChart.data.labels=label
        this.pieChart.data.datasets[0].data=data
        this.pieChart.data.datasets[0].label=title
        this.pieChart.data.datasets[0].backgroundColor=color1
        this.pieChart.update()
    }

    render() {
        return (
            <canvas ref={this.ref}/>
        )
    }
}
