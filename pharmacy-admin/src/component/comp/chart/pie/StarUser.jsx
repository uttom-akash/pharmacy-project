import React, { Component } from 'react'
import PurePieChart from './PurePieChart'
import api from '../../../api/Api'
import {setDate} from '../../date/Date'
import {Input,Button,Statistic} from 'semantic-ui-react'

export default class TrendingDrugs extends Component {
   
    state={
        title:'',
        label:[],
        data:[],
        total:'',
        date:'',
        days:'',
        limit:''
    }

    getApiData=(date,days,limit)=>{
        api.topTenUser({date,days,limit}).then(res=>{
          let list=res['users']
          let label=[],data=[]
          let total=res['total'],other=total;
          
          list.map(item=>{
                          other=other-item.sales;
                          label.push(item.name)
                          data.push(((item.sales*100)/total).toPrecision(3))})
          label.push('other')
          data.push( ((other*100)/total).toPrecision(3) )                
          this.setState({title:`Top ${limit} Users`,label,data,total})
        })
    }

    componentWillMount=()=>{
      this.getApiData(setDate(-30),30,10)    
    }
  
  onChange=(ev)=>{
      this.setState({[ev.target.name]:ev.target.value})
  }
  
  onSubmit=()=>{
      const {date,days,limit}=this.state
      this.getApiData(date,days,limit)
  }
    
    render() {
        const {total,date,days,limit,title,label,data}=this.state
        return (
            <React.Fragment>
                <h3>Star User</h3>
                <Statistic size='mini' label={'sales'} value={total} horizontal/><br/>	
                <Input color='black' size='small' name={'date'} label={'date'} placeholder={'yyyy-mm-dd'} onChange={this.onChange} value={date}/>
                <Input color='black' size='small' name={'days'} label={'days'} onChange={this.onChange} value={days}/>
                <Input color='black' size='small' name={'limit'} label={'limit'} onChange={this.onChange} value={limit}/>
                <Button color='black' size='small' onClick={this.onSubmit}>show</Button>
                
                <div className='sub-card'>
                    <PurePieChart title={title} label={label} data={data}/>
                </div>
            </React.Fragment>
        )
    }
}
