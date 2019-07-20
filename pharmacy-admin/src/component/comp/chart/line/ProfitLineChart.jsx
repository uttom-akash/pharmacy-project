import React, { Component } from 'react'
import api from '../../../api/Api'
import PureLineChart from './PureLineChart'
import {Input,Statistic,Button} from 'semantic-ui-react'
import {setDate} from '../../date/Date'
import createDataset from '../CreateDatasets'


export default class ProfitLineChart extends Component {
    state={
      profitTitle1:'',
      profitTitle2:'',
      profitOnward:[],
      profitPrevious:[],
      profitLabel:[],

      total:0,
      date:'',
      days:''
    }


    getdate=(date)=>new Date(date).getDate()


    callbackSetState=(st)=>this.setState(st)

    getApiData=(date,days)=>{
        api.profitByDays({date,days}).then(res=>{
          createDataset(res['list'],this.getdate(date),days,this.callbackSetState,'profit','profitOnward','profitLabel')
          this.setState({profitTitle1:date,total:this.state.total+res['total']})
        })

        api.profitByDays({date,days:-days}).then(res=>{
          createDataset(res['list'],this.getdate(res['startDate']),days,this.callbackSetState,'profit','profitPrevious','profitLabel')
          this.setState({profitTitle2:res['startDate'],total:this.state.total+res['total']})
        })
    }

    componentWillMount=()=>{
      this.getApiData(setDate(-2),30)    
    }
  
  onChange=(ev)=>{
    this.setState({[ev.target.name]:ev.target.value})
  }
  
  onSubmit=()=>{
    const {date,days}=this.state
    this.setState({total:0})
    this.getApiData(date,days)
  }

  
  render() {
    const {profitTitle1,profitTitle2,profitOnward,profitPrevious,profitLabel,total,date,days}=this.state;
        
    return (
      <div>
            <h3>Profit</h3>
            <Button basic size='mini' color='black' onClick={()=>this.props.onClick('/profit-report')}>View Report</Button><br/>
            <Statistic size='mini' label={'profit'} value={total} horizontal/><br/>	
            <Input size='small' name={'date'} label={'date'} placeholder={'yyyy-mm-dd'} onChange={this.onChange} value={date}/>
            <Input size='small' name={'days'} label={'days'} onChange={this.onChange} value={days}/>
            <Button size='small' color='black' onClick={this.onSubmit}>show</Button>
            <div className='sub-card'>
              <PureLineChart title1={profitTitle1} data1={profitOnward} title2={profitTitle2} data2={profitPrevious} label={profitLabel}/>
            </div>
      </div>
    )
  }
}
