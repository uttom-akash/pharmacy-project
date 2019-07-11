import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default ({isOpen,children,icon,header,onToggle}) => {
    return(
      <Modal closeIcon open={isOpen} basic size='small' onClose={onToggle}>
        <Header icon={icon} content={header}/>
        <Modal.Content>
          {children}
        </Modal.Content>
      </Modal>
      )}