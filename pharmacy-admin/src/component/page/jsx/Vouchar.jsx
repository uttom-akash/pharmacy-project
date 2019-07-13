import React, { Component } from 'react'
import {Form,Button,Label, Segment,Input ,Dropdown} from 'semantic-ui-react'
import Listing from '../../comp/data/Listing'
import api from '../../api/Api'

export default class Vouchar extends Component {
    
    constructor(props){
        super(props)

        this.state={
            header:['drugName','quantity','price'],
            
            EmployeeOptions:[],
            employee:'',
            query:'',
            isEmployeeFetching:false,
            empID:{}
            
        }
    }

    componentWillMount=()=>api.viewDetails({orderID:this.props.orderID}).then(res=>this.setState({vouchar:res}))

    handleEmployeeChange=(e,{value})=>this.setState({employee:value})

    handleEmployeeSearchChange=(e,{searchQuery})=> {
    
        clearTimeout(this.timer);
        this.setState({query:searchQuery});

        this.timer=setTimeout(()=>{
            if(searchQuery.length){
                this.setState({isEmployeeFetching:true})
                api.getEmployee({employee:searchQuery}).then(res=>{
                    let empID={}
                    let list=res['List'].map(cat=>{
                        empID[cat['FIRST_NAME']]=cat['EMPLOYEE_ID']
                        return   ({key:cat['FIRST_NAME'],text:cat['FIRST_NAME'],value:cat['FIRST_NAME']})
                    });
                    
                    this.setState({isEmployeeFetching:false,EmployeeOptions:list,empID})
                })
            }
        },1000);
    }


    toggle=()=>this.setState({modal:!this.state.modal})
     

    
    
    onChange=(event)=>this.setState({[event.target.name] :event.target.value});
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        const {vouchar,duration,employee,empID}=this.state;


        api.approveOrder({vouchar:vouchar,duration,employeeID:empID[employee]}).then(res=>{this.props.toggle()})        
    }

    onCancel=(ev)=>{
        ev.preventDefault();
        const {vouchar}=this.state;
        api.rejectOrder({orderID:vouchar['orderinfo']['ORDER_ID']})
        this.props.toggle()
    }

    render() {
        const {vouchar,duration,employee,EmployeeOptions,isEmployeeFetching,header}=this.state;

    return (
            <Form>
                { 
                vouchar &&
                <React.Fragment>
                <Segment style={{width:'100%'}}>
                        <Label tag>Delivary Info</Label><br/><br/>
                        <Label>Date :<Label.Detail>{vouchar['orderinfo']['DATE']} </Label.Detail></Label>
                        <Label>Time :<Label.Detail>{vouchar['orderinfo']['TIME']}</Label.Detail></Label><br/>
                        <Label>Duration : <Input type="text" name="duration" value={duration}  onChange={this.onChange}/></Label><br/>
                        <Label>User :<Label.Detail>{vouchar['user']['FIRST_NAME'] }{` `}{ vouchar['user']['LAST_NAME']}</Label.Detail></Label><br/>
                        <Label>Address  : <Label.Detail>{vouchar['orderinfo']['ADDRESS']}</Label.Detail> </Label><br/>
                        <Label>Number   : <Label.Detail>{vouchar['orderinfo']['USER_CONTACT_NUMBER']}</Label.Detail></Label><br/>
                </Segment>
                <Segment style={{width:'100%'}}>
                        <Label tag>Drugs</Label><br/><br/>
                        <Listing header={header} list={vouchar['drugsList']} listIndex={header}><Label as='a' color='teal' ribbon>Total :{vouchar['orderinfo']['TOTAL_PRICE']}</Label></Listing>
                </Segment >
                       
                <Segment style={{width:'100%'}}>
                        <Label tag>Payment</Label><br/><br/>
                        <Label>Cash on Delivary</Label><br/>
                        <Label>Employee : 
                            <Dropdown
                            selection
                            search={true}
                            options={EmployeeOptions}
                            value={employee}
                            placeholder='employee'
                            onChange={this.handleEmployeeChange}
                            onSearchChange={this.handleEmployeeSearchChange}
                            disabled={isEmployeeFetching}
                            loading={isEmployeeFetching}
                            label={'Employee'}
                            />
                        </Label><br/>
                </Segment>
                <Button.Group>
                        <Button onClick={this.onSubmit}  color='teal'>Confirm</Button><Button.Or/>
                        <Button onClick={this.onCancel} color='red'>Cancel</Button>                     
                </Button.Group>
                </React.Fragment>
                }
            </Form>
    )
  }
}
