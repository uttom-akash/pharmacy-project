import React from 'react'
import {Menu,Icon} from 'semantic-ui-react'


export default function TableMenu({left,right}) {
    return ( 
    <Menu floated='right' pagination>
        <Menu.Item as='a' icon onClick={()=>left(-1)}>
            <Icon name='chevron left' />
        </Menu.Item>
        <Menu.Item as='a' icon onClick={()=>right(+1)}>
            <Icon name='chevron right' />
        </Menu.Item>
    </Menu>
    )
}
