import React, { Component } from 'react'
import {Form,Button,Label, Segment,Input ,Search} from 'semantic-ui-react'
import Listing from '../../comp/data/Listing'
import api from '../../api/Api'

export default class Vouchar extends Component {
    
    constructor(props){
        super(props)

        this.state={
            header:['drugName','quantity','price'],
            
            EmployeeOptions:[],
            query:'',
            isEmployeeFetching:false,
            employeeID:null
            
        }
    }

    componentWillMount=()=>api.viewDetails({orderID:this.props.orderID}).then(res=>this.setState({vouchar:res}))

    handleEmployeeChange=(e,{result})=>{
        this.setState({query:result['title'],employeeID:result['id']})
        console.log(result);
    }
    handleEmployeeSearchChange=(e,{value})=> {
    
        clearTimeout(this.timer);
        this.setState({query:value});

        this.timer=setTimeout(()=>{
            if(value.length){
                this.setState({isEmployeeFetching:true})
                api.searchEmployee({name:value}).then(res=>
                    
                    this.setState({isEmployeeFetching:false,EmployeeOptions:res['List']})
                )
            }
        },1000);
    }


    toggle=()=>this.setState({modal:!this.state.modal})
     

    
    
    onChange=(event)=>this.setState({[event.target.name] :event.target.value});
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        const {vouchar,duration,employeeID}=this.state;


        api.approveOrder({vouchar:vouchar,duration,employeeID:employeeID}).then(res=>{
            this.props.toggle()
            api.setNotification({userID:vouchar['orderinfo']['USER_ID'],header:`Order ${vouchar['orderinfo']['ORDER_ID']}`,type:'order',message:`Your order of order_ID-${vouchar['orderinfo']['ORDER_ID']} is accpeted`,image_src:''})
            this.props.approve();
        })        
    }

    onCancel=(ev)=>{
        ev.preventDefault();
        const {vouchar}=this.state;
        this.props.toggle()
        this.props.reject(vouchar['orderinfo']['ORDER_ID'],vouchar['orderinfo']['USER_ID'])
    }

    render() {
        const {vouchar,duration,query,EmployeeOptions,isEmployeeFetching,header}=this.state;

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
                            <Search
                            results={EmployeeOptions}
                            value={query}
                            onResultSelect={this.handleEmployeeChange}
                            onSearchChange={this.handleEmployeeSearchChange}
                            loading={isEmployeeFetching}
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
