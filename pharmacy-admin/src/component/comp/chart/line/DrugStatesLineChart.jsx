import React, { Component } from 'react'
import api from '../../../api/Api'
import PureLineChart from './PureLineChart'
import {Input,Statistic,Button} from 'semantic-ui-react'
import {setDate} from '../../date/Date'
import createDataset from '../CreateDatasets'


export default class  DrugStatesLineChart extends Component {
    state={
      quantityTitle:'',
      quantityLabel:[],
      quantityData:[],

      expireTitle:'',
      expireLabel:[],
      expireData:[],

      total:0,
      numberOfDrugs:30
    }


    getdate=(date)=>new Date(date).getDate()


    callbackSetState=(st)=>this.setState(st)

    getApiData=()=>{
        const {numberOfDrugs}=this.state
        api.drugStatesOverview({limit:numberOfDrugs}).then(res=>{
            let quantity=res['quantity']
            let expire=res['expire']

            let quantityLabel=[],quantityData=[],expireLabel=[],expireData=[]

            quantity.map(item=>{quantityLabel.push(item.name);quantityData.push(item.quantity)})
            expire.map(item=>{expireLabel.push(item.name);expireData.push(item.days)})

            this.setState({quantityTitle:`${numberOfDrugs} Lowest Quantity Drugs`,quantityLabel,quantityData,expireTitle:`${numberOfDrugs} Most Probable Expirable Drugs`,expireLabel,expireData})
        })
    }

    componentWillMount=()=>{
      this.getApiData()    
    }
  
  onChange=(ev)=>{
    this.setState({[ev.target.name]:ev.target.value})
  }
  
  onSubmit=()=>{
    this.setState({total:0})
    this.getApiData()
  }
  
  render() {
    const {quantityTitle,quantityLabel,quantityData,expireTitle,expireLabel,expireData,total,numberOfDrugs}=this.state;
        
    return (
      <div>
            <h3>Drug States</h3>
            <Button basic color='black' size='mini' onClick={()=>this.props.onClick('/drug-states')}>View Report</Button><br/>
            <Statistic size='mini' label={'sales'} value={total} horizontal/><br/>	
            <Input color='black' size='small' name={'numberOfDrugs'} label={'Number of Drugs'} onChange={this.onChange} value={numberOfDrugs}/>
            <Button color='black' size='small' onClick={this.onSubmit}>show</Button>
            <div className='sub-card'>
              <PureLineChart title1={quantityTitle} data1={quantityData}  label={quantityLabel}/>
            </div>
            <div className='sub-card'>
              <PureLineChart title1={expireTitle} data1={expireData}  label={expireLabel}/>
            </div>
      </div>
    )
  }
}
