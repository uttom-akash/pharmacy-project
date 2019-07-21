import React, { Component } from 'react'
import { Image, Button, Card, Icon, Segment,Label, Header} from  'semantic-ui-react'


export default class Carousal extends Component {
    
    state={
        offset:0,
    }

    left=()=>{
        let {offset}=this.state
        if(offset>=3)this.setState({offset:offset-3})
    }

    right=()=>{
        const {limit}=this.props
        let {offset}=this.state
        if(offset+3<limit)this.setState({offset:offset+3})
    }

    componentWillMount=()=>{
        const {limit}=this.props
        if(!!limit){
            this.timer=setInterval(()=>this.setState({offset:(this.state.offset+3)%limit}),6000)
        }
    }

    componentWillUnmount=()=>{
        clearInterval(this.timer)
    }

    onClick=(drugID)=>{
        this.props.onClick(drugID)
         }

    getData=()=>{
        const {drugs,limit}=this.props;
        const {offset}=this.state
        console.log(limit,offset);
        
        let ar=[0,1,2]
        return (
            <div style={{display:'flex',alignItems:'center'}}>
            {offset>=3 && <Icon name='chevron left' onClick={this.left}/>}
            <Card.Group itemsPerRow={3} style={{marginLeft:'1rem',marginRight:'1rem'}}>
                {ar.map(item=>
                    <Card>
                        <Image
                        style={{width:'300px',height:'280px'}} 
                        label={{color: 'red', content: `${drugs[offset+item]['DISCOUNT']}%`, icon: 'star', ribbon: true }}
                        src={drugs[offset+item]['IMAGE_SRC']}/>
                        <Card.Content>
                            <Button onClick={()=>this.onClick(drugs[offset+item]['DRUG_ID'])}>shop now</Button>
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>
            {offset+3<limit && <Icon name='chevron right' onClick={this.right}/>}
            </div>
            
        )
        
}

    
    render() {
        const {status}=this.props
        return (
            <div>
                <Header as='h3'>{status}</Header>
                {
                 this.getData()
                           
                }
            </div>
        )
    }
}
