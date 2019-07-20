import React, { Component } from 'react'
import Chart from 'chart.js'
import randomColor from 'randomcolor'


export default class PureLineChart extends Component {
    constructor(props){
        super(props)
        this.ref=React.createRef()
    }

    getColor=(options)=>randomColor(options)

    componentDidMount=()=>{
        
        const {title1,label,data1,title2,data2}=this.props  
        let color1=this.getColor({luminosity: 'dark',hue: 'red'});
        let color2=this.getColor({luminosity: 'dark',hue: 'blue'})
        this.chart=new Chart(this.ref.current,{
            type:'line',
            data:{
                labels:label,
                datasets:[
                    {
                        label:title1,
                        data:data1,
                        fill: 'none',
                        backgroundColor: color1,
                        pointRadius: 2,
                        borderColor: color1,
                        borderWidth: 1,
                        lineTension: 0
                        
                    },
                    {
                        label:title2,
                        data:data2,
                        fill: 'none',
                        backgroundColor: color2,
                        pointRadius: 2,
                        borderColor: color2,
                        borderWidth: 1,
                        lineTension: 0
                        
                    }
                    
                ]
            },
            options: {
                maintainAspectRatio:false,
              }
        
        
        })
    }

    componentDidUpdate=()=>{
        const {title1,label,data1,title2,data2}=this.props
        console.log(label);
        
        this.chart.data.labels=label
        this.chart.data.datasets[0].data=data1
        this.chart.data.datasets[0].label=title1
        this.chart.data.datasets[1].data=data2
        this.chart.data.datasets[1].label=title2
        this.chart.update()
    }


    render() {
        return (
            <canvas ref={this.ref}/>
        )
    }
}
