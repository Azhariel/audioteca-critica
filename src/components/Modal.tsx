import { ModalBackground, ModalCloseButton, ModalContainer } from '@/styles'
import React, { useEffect } from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>
          <ClearRoundedIcon />
        </ModalCloseButton>
        {children}
      </ModalContainer>
    </ModalBackground>
  )
}

export default Modal
