import React from 'react'
import {Table,Checkbox, Button} from 'semantic-ui-react'

const getConvert=(op)=>{
  if(op===0)return 'pending'
  else if(op>0) return 'accepted'
  else return 'rejected'
}

export default ({header,list,listIndex,onClick1,onClick2,clickText1,clickText2,clickKey1,clickKey2,children,special,checkKey,checkToggle})=>{
  return (
    <Table celled color='teal' size="small">
   
    <Table.Header>
      <Table.Row>
        {header.map((head,index)=><Table.HeaderCell key={index}>{head}</Table.HeaderCell>)}
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
        list.map((row,index)=><Table.Row key={index}>
            
           {
              listIndex.map((col,index)=>
                    <Table.Cell  key={index} >
                      {checkToggle && <Checkbox onChange={()=>checkToggle(row[checkKey])} checked={row['status']} style={{marginRight:'5px'}}/>}
                      {row[col]}
                    </Table.Cell>
              )
            }
            {
              special && <Table.Cell warning>
                      {getConvert(row[special])}
              </Table.Cell>
            }
            <Table.Cell>
              <Button.Group size='mini'>
                  {onClick1 && <Button color='teal' onClick={()=>onClick1(row[clickKey1])}>{clickText1}</Button>}
                  {onClick2 && <Button color='teal' onClick={()=>onClick2(row[clickKey2])}>{clickText2}</Button>}
                </Button.Group>
            </Table.Cell>
          </Table.Row>
          )
      }
    </Table.Body>


    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          {children}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>        
  )
}
