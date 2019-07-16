import React from 'react'
import {Message,Icon} from 'semantic-ui-react'

export default function LoadinMessage({visiblity,text}) {
    return (
        <Message  hidden={visiblity} color='black' style={{position:'fixed',top:'8.5rem',right:'1rem',zIndex:'2'}}>
            <Icon name='circle notched' loading />
            {text}
        </Message>
    )
}
