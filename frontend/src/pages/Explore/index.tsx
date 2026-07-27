import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import api from '../../services/api'
import { Profile } from '../../types'
import {
  LayoutContainer,
  ExploreContainer,
  Header,
  SearchInput,
  UserList,
  UserCard,
  UserDetails,
  UserAvatar,
  UserNames,
  FollowButton,
  FeedbackMessage,
} from './styles'

export function Explore() {
  const [search, setSearch] = useState('')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await api.get<Profile>('profiles/me/')
        setCurrentUser(response.data)
      } catch (err) {
        console.error('Erro ao buscar perfil atual:', err)
      }
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true)
      try {
        // opção para remover o @ cado o usuario estaja pesquisando pelo username com @
        const cleanSearch = search.trim().replace(/^@/, '')
        const response = await api.get(`profiles/?search=${cleanSearch}`)
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || []

        const myUsername = currentUser?.username || currentUser?.username

        // Filtra para não exibir o próprio usuário logado na busca
        const filtered = data.filter((p: Profile) => {
          const pUsername = p.username || p.username
          return pUsername !== myUsername
        })

        setProfiles(filtered)
      } catch (err) {
        console.error('Erro ao buscar perfis:', err)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchProfiles()
    }, 300)

    return () => clearTimeout(timer)
  }, [search, currentUser])

  const handleFollow = async (targetUsername: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await api.post(`profiles/${targetUsername}/follow/`)

      // Atualiza o usuário atual para sincronizar quem ele segue
      const updatedMe = await api.get<Profile>('profiles/me/')
      setCurrentUser(updatedMe.data)
    } catch (err) {
      console.error('Erro ao seguir/deixar de seguir:', err)
    }
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <ExploreContainer>
        <Header>
          <SearchInput
            type="text"
            placeholder="Busque pelo nickname do usuário desejado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Header>

        <UserList>
          {loading ? (
            <FeedbackMessage>Buscando...</FeedbackMessage>
          ) : profiles.length === 0 ? (
            <FeedbackMessage>
              Nenhum usuário encontrado por enquanto.
            </FeedbackMessage>
          ) : (
            profiles.map((profile) => {
              const username = profile.username || profile.username || ''
              const isFollowing = currentUser?.following?.some(
                (f: any) => f === profile.id || f.id === profile.id
              )

              return (
                <UserCard key={profile.id}>
                  <UserDetails onClick={() => navigate(`/profile/${username}`)}>
                    <UserAvatar>
                      {profile.avatar ? (
                        <img src={profile.avatar} alt={username} />
                      ) : (
                        <div>{username?.[0]?.toUpperCase() || 'M'}</div>
                      )}
                    </UserAvatar>
                    <UserNames>
                      <strong>{profile.display_name || username}</strong>
                      <span>@{username}</span>
                    </UserNames>
                  </UserDetails>

                  <FollowButton
                    $isFollowing={isFollowing}
                    onClick={(e) => handleFollow(username, e)}
                  >
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </FollowButton>
                </UserCard>
              )
            })
          )}
        </UserList>
      </ExploreContainer>
    </LayoutContainer>
  )
}