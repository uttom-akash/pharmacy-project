import React from 'react'
import  Modal from '../modal/Modal'

export default function Edit({toggle,modal,children}) {
    return (
        <div>
            <Modal toggle={toggle} modal={modal}>
                {children}
            </Modal>
        </div>
    )
}
