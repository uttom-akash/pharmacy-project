import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({visiblity,text,status})=> {
    return (<Message  hidden={visiblity} style={{position:'fixed',top:'8.5rem',right:'1rem',zIndex:'2'}} color={status}>{text}</Message>)
}
