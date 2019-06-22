import React from 'react'
import {Modal,ModalHeader,ModalBody,closeBtn} from 'reactstrap'
import "./Modal.css"

export default ({modal,toggle,children})=>{
    return (
        <Modal isOpen={modal} centered={true} fade={true} toggle={toggle} id="custom-modal">
            <ModalBody>
                {children}
            </ModalBody>
        </Modal> 
  )
}
