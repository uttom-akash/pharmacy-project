import React, { Component } from 'react'
import api from '../../../api/Api'
import PureLineChart from './PureLineChart'
import {Input,Statistic,Button} from 'semantic-ui-react'
import {setDate} from '../../date/Date'
import createDataset from '../CreateDatasets'


export default class SalesLineChart extends Component {
    state={
      salesTitle1:'',
      salesTitle2:'',
      salesOnward:[],
      salesPrevious:[],
      salesLabel:[],

      total:0,
      date:'',
      days:''
    }


    getdate=(date)=>new Date(date).getDate()


    callbackSetState=(st)=>this.setState(st)

    getApiData=(date,days)=>{
        api.saleByDays({date,days}).then(res=>{
          createDataset(res['list'],this.getdate(date),days,this.callbackSetState,'sales','salesOnward','salesLabel')
          this.setState({salesTitle1:date,total:this.state.total+res['total']})
        })

        api.saleByDays({date,days:-days}).then(res=>{
          createDataset(res['list'],this.getdate(res['startDate']),days,this.callbackSetState,'sales','salesPrevious','salesLabel')
          this.setState({salesTitle2:res['startDate'],total:this.state.total+res['total']})
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
    const {salesTitle1,salesTitle2,salesOnward,salesPrevious,salesLabel,total,date,days}=this.state;
        
    return (
      <div>
            <h3>Sales</h3>
            <Button basic color='black' onClick={()=>this.props.onClick('/sales-report')}>View Report</Button><br/>
            <Statistic size='mini' label={'sales'} value={total} horizontal/><br/>	
            <Input color='black' size='small' name={'date'} label={'date'} placeholder={'yyyy-mm-dd'} onChange={this.onChange} value={date}/>
            <Input color='black' size='small' name={'days'} label={'days'} onChange={this.onChange} value={days}/>
            <Button color='black' size='small' onClick={this.onSubmit}>show</Button>
            <div className='sub-card'>
              <PureLineChart title1={salesTitle1} data1={salesOnward} title2={salesTitle2} data2={salesPrevious} label={salesLabel}/>
            </div>
      </div>
    )
  }
}
