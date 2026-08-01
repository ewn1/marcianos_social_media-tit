import { useNavigate } from 'react-router-dom'
import { Profile } from '../../types'
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  UserItem,
  UserInfoWrapper,
  UserAvatar,
  UserDetails,
  EmptyStateText,
} from './styles'

interface FollowListModalProps {
  title: string
  users: Profile[]
  loading?: boolean
  onClose: () => void
}

export function FollowListModal({
  title,
  users,
  loading,
  onClose,
}: FollowListModalProps) {
  const navigate = useNavigate()

  const handleUserClick = (username: string) => {
    onClose()
    navigate(`/profile/${username}`)
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </ModalHeader>

        <ModalContent>
          {loading ? (
            <EmptyStateText>Carregando usuários...</EmptyStateText>
          ) : users.length === 0 ? (
            <EmptyStateText>Nenhum usuário encontrado.</EmptyStateText>
          ) : (
            users.map((user) => (
              <UserItem
                key={user.id}
                onClick={() => handleUserClick(user.username)}
              >
                <UserInfoWrapper>
                  <UserAvatar>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} />
                    ) : (
                      user.display_name?.[0]?.toUpperCase() ||
                      user.username[0]?.toUpperCase() ||
                      'U'
                    )}
                  </UserAvatar>
                  <UserDetails>
                    <strong>{user.display_name || user.username}</strong>
                    <span>@{user.username}</span>
                  </UserDetails>
                </UserInfoWrapper>
              </UserItem>
            ))
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  )
}
