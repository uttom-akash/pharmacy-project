import React from 'react'
import {Header,Modal } from 'semantic-ui-react'

export default ({isOpen,children,icon,header,onToggle,basic}) => {
    return(
      <Modal closeIcon open={isOpen}  basic={basic} centered size='small' onClose={onToggle}>
        <Header icon={icon} content={header}/>
        <Modal.Content>
          {children}
        </Modal.Content>
      </Modal>
      )}