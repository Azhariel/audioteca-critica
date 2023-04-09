import { ModalBackground, ModalCloseButton, ModalContainer } from '@/styles'
import React from 'react'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        {children}
      </ModalContainer>
    </ModalBackground>
  )
}

export default Modal
