import React, { Component } from 'react'
import Modal from '../../unitComp/modal  basic/Modal'
import ask from '../../../assets/girl.png' 
import "../css/Ask.css"

export default class Ask extends Component {
   
    state={
       modal:false
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
  
    render() {
        return (
         <div className="ask-container">
            <div className="askme-content">
             <img onClick={this.onToggle} src={ask} alt="ask" className="ask"/>  
             <label>Ask me anything ...</label>
            </div>
            <Modal modal={this.state.modal} onToggle={this.onToggle}>
            <iframe
                       allow="microphone;"
                       width="350"
                       height="300"
                       frameBorder="0"
                       src="https://console.dialogflow.com/api-client/demo/embedded/236ae630-10d3-48d5-8147-1b4aa7a5ed7b">
                </iframe>   
            </Modal>       
           </div>
    )
  }
}
