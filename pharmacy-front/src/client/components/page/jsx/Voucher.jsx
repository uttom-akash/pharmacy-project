import React from 'react'
import {Segment, Label,Button} from 'semantic-ui-react'
import Table from '../../unitComp/table/Table'

export default  ({header,vouchar,toogle})=> {
    return (
      <div>
                <Segment style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Delivary Info</Label><br/><br/>
                        <Label>Date :<Label.Detail>{vouchar['orderinfo']['DATE']} </Label.Detail></Label>
                        <Label>Time :<Label.Detail>{vouchar['orderinfo']['TIME']}</Label.Detail></Label><br/>
                        {/* <Label>Duration :<Label.Detail>{vouchar['orderinfo']['']}</Label.Detail> </Label><br/> */}
                        <Label>User :<Label.Detail>{vouchar['user']['FIRST_NAME'] }{` `}{ vouchar['user']['LAST_NAME']}</Label.Detail></Label><br/>
                        <Label>Address  : <Label.Detail>{vouchar['orderinfo']['ADDRESS']}</Label.Detail> </Label><br/>
                        <Label>Number   : <Label.Detail>{vouchar['orderinfo']['USER_CONTACT_NUMBER']}</Label.Detail></Label><br/>
                </Segment>
                <Segment style={{width:'100%'}}>
                        <Label size='mini' color='teal' tag>Drugs</Label><br/><br/>
                        <Table header={header} list={vouchar['drugsList']} listIndex={header}><Label as='a' size='mini' color='teal' ribbon>Total :{vouchar['orderinfo']['TOTAL_PRICE']}</Label></Table>
                </Segment >
                       
                <Segment style={{width:'100%'}}>
                        <Label color='teal' size='mini' tag>Payment</Label><br/><br/>
                        <Label>Cash on Delivary</Label><br/>
                        <Label>Employee : <Label.Detail>{vouchar['orderinfo']['ADDRESS']}</Label.Detail></Label><br/>
                </Segment>
                <Button.Group>
                        <Button onClick={toogle}  color='teal'>Ok</Button>                    
                </Button.Group>
                     
      </div>
    )
  }

