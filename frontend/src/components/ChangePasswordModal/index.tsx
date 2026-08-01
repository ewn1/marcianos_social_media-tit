import { useState, SyntheticEvent } from 'react'
import api from '../../services/api'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  EditForm,
  EditLabel,
  SaveButton,
  ButtonGroup,
  CancelButton,
} from './styles'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!oldPassword || !newPassword) {
      alert('Preencha a senha atual e a nova senha.')
      return
    }

    setLoading(true)
    try {
      await api.post('profiles/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
      })
      alert('Senha alterada com sucesso!')
      setOldPassword('')
      setNewPassword('')
      onClose()
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error)
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        'Erro ao alterar senha.'
      alert(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Alterar Senha</h3>
          <button onClick={onClose}>X</button>
        </ModalHeader>

        <EditForm onSubmit={handleSubmit}>
          <EditLabel>Senha atual:</EditLabel>
          <input
            type="password"
            placeholder="Digite sua senha atual"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <EditLabel>Nova senha:</EditLabel>
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <ButtonGroup>
            <SaveButton type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </SaveButton>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
          </ButtonGroup>
        </EditForm>
      </ModalContent>
    </ModalOverlay>
  )
}
