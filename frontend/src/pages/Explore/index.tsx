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
  const [myFollowingIds, setMyFollowingIds] = useState<(string | number)[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCurrentUserAndFollowing() {
      try {
        const response = await api.get<Profile>('profiles/me/')
        setCurrentUser(response.data)

        // Busca a lista real de quem o usuário logado segue usando o endpoint da API
        const followingResponse = await api.get(
          `profiles/${response.data.username}/following/`,
        )
        const followingData = Array.isArray(followingResponse.data)
          ? followingResponse.data
          : followingResponse.data.results || []

        // Mapeia os IDs ou usernames de quem seguimos
        const ids = followingData.map((f: any) => f.id || f.username || f)
        setMyFollowingIds(ids)
      } catch (err) {
        console.error('Erro ao buscar dados do usuário atual:', err)
      }
    }
    fetchCurrentUserAndFollowing()
  }, [])

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true)
      try {
        const cleanSearch = search.trim().replace(/^@/, '')
        const response = await api.get(`profiles/?search=${cleanSearch}`)
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || []

        const myUsername = currentUser?.username

        const filtered = data.filter((p: Profile) => {
          const pUsername = p.username
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

      // Atualiza a lista de quem seguimos após clicar no botão
      const followingResponse = await api.get(
        `profiles/${currentUser?.username}/following/`,
      )
      const followingData = Array.isArray(followingResponse.data)
        ? followingResponse.data
        : followingResponse.data.results || []

      setMyFollowingIds(followingData.map((f: any) => f.id || f.username || f))
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
              const username = profile.username || ''

              // Verifica se o ID ou username do perfil está no array de quem seguimos
              const isFollowing = myFollowingIds.some(
                (idOrUser) =>
                  String(idOrUser) === String(profile.id) ||
                  String(idOrUser) === String(username),
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
                    $isFollowing={Boolean(isFollowing)}
                    onClick={(e) => handleFollow(username, e)}
                  >
                    <span className="text-default">
                      {isFollowing ? 'Seguindo' : 'Seguir'}
                    </span>
                    <span className="text-hover">Deixar de seguir</span>
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
