import React, { Component } from 'react'
import {Checkbox,Button,Segment,Dimmer,Loader,Form} from 'semantic-ui-react'
import '../css/Get.css'

export default class GetUser extends Component {
    state={
        params:[{param:'ID',status:false,value:""},{param:'firstName',status:false,value:""},{param:'lastName',status:false,value:""},{param:"contactNumber",status:false,value:""}],
        loading:false
    }

    componentWillMount=()=>{
        this.setState({params:this.props.params})
    }

    handleChange=(checked,index)=>{
        let params=this.state.params.slice(0);
        params[index]['status']=checked
        this.setState({params})
    }
    
    inputChange=(index,ev)=>{
        let params=this.state.params.slice(0);
        params[index].value=ev.target.value.trim();
        this.setState({params})
    }

    onSubmit=(ev)=>{
        ev.preventDefault()
        
        this.setState({loading:true})
        let params=this.state.params.filter(param=>param.status && param.value.length)
        this.props.onSubmit({list:params}).then(res=>this.setState({loading:false}))
    }

    render() {
        const {params,loading}=this.state;
        return (
            <div className="get-form">

                        <Dimmer active={loading}>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Form onSubmit={this.onSubmit}>
                                {
                                    params.map((param,index)=>
                                            <div key={index} className="param">
                                                <Checkbox
                                                style={{width:'10rem'}}
                                                label={param.param}
                                                onChange={(e,{checked})=>this.handleChange(checked,index)}
                                                />
                                                {param.status && <input id="input" name={param.param} value={param.value} placeholder={param.param} onChange={(ev)=>this.inputChange(index,ev)}/>}
                                            </div>

                                    )
                                }
                            <Button>Query</Button>
                        </Form>
            </div>
        )
    }
}
