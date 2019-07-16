import React from 'react'
import {Confirm} from 'semantic-ui-react'

export default ({open,btn1,btn2,click1,click2,text})=>{
    return (
        <Confirm
            content={text}
            confirmButton={btn1}
            cancelButton={btn2}
            onConfirm={click1}
            onCancel={click2}
            open={open}
        />
    )
}
