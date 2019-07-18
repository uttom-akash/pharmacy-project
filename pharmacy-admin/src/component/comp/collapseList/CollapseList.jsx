import React from 'react'
import {Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

export default function CollapseList({list,header,onClick}) {
    return (
        <Dropdown floating item text={header} >
                     <Dropdown.Menu>
                         {
                             list.map(item=><Dropdown.Item text={item.name} onClick={()=>onClick(header,item.path)}></Dropdown.Item>)
                         }
                    </Dropdown.Menu>
        </Dropdown>
    )
}
