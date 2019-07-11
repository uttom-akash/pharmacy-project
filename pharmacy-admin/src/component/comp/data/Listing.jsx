import React from 'react'
import {Table} from 'semantic-ui-react'

export default function Listing({list,listIndex=[]}) {
    return (
        <div>
          <Table celled>

                <Table.Header>
                    <Table.Row>
                        {
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
                           </Table.Row>
   
                        )
                    }
                </Table.Body>

          </Table>  
        </div>
    )
}
