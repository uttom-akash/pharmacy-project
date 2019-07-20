import React from 'react'
import {Table, Button} from 'semantic-ui-react'

export default function Listing({list,listIndex=[],header,inputComp,onClick1,onClick2,onClick3,clickText1,clickText2,clickText3,clickKey1,clickKey2,clickKey3,children}) {
    return (
        <div>
          <Table celled>

                <Table.Header>
                    <Table.Row>
                        {
                            !!header ? header.map((header,index)=><Table.HeaderCell key={index}>{header}</Table.HeaderCell>):
                            listIndex.map((header,index)=><Table.HeaderCell key={index}>{header}</Table.HeaderCell>)
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        list.map((row,index)=>
                             <Table.Row>
                                 {
                                     listIndex.map((col,index)=><Table.Cell>{row[col]}</Table.Cell>)
                                 }
                                {
                                    !!inputComp && <Table.Cell>{inputComp}</Table.Cell>
                                }   
                              <Table.Cell>
                                <Button.Group size='mini'>
                                    {onClick1 && <Button color='teal' onClick={()=>onClick1(row[clickKey1])}>{clickText1}</Button>}
                                    {onClick2 && <Button.Or/>}
                                    {onClick2 && <Button color='teal' onClick={()=>onClick2(row[clickKey2])}>{clickText2}</Button>}
                                    {onClick3 && <Button.Or/>}
                                    {onClick3 && <Button color='teal' onClick={()=>onClick3(row[clickKey3])}>{clickText3}</Button>}
                                    </Button.Group>
                                </Table.Cell>   
                           </Table.Row>
   
                        )
                    }
                </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>
          {children}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>   

          </Table>  
        </div>
    )
}
