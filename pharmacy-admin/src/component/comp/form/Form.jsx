import React, { Component } from 'react'
import {Form} from 'semantic-ui-react'
import {FileInput} from './FileInput'

export default class Form extends Component {
    render() {
        return (
            <Form>
                <FileInput/>
                
                <Form.Input
                label="First Name"
                />
                
                <Form.Input 
                label="Last name"
                />

                
                <Form.Input
                label="Address"
                />

                
                <Form.Input
                label="Contact Number"
                />
            </Form>
        )
    }
}
