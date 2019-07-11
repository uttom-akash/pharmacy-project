import React from 'react'
import {List,Icon} from 'semantic-ui-react'

export default function ListItem({icon,text,children}) {
    return (
    <List.Item>
        {icon &&   <Icon name={icon} style={{color:'#00BFFF'}}/>}
        <List.Content>
            <List.Header>{text}{children}</List.Header>
        </List.Content>
    </List.Item>
    )
}
