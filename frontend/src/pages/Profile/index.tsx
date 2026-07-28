import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import api from '../../services/api'
import { Profile, Tit } from '../../types'
import {
  LayoutContainer,
  ProfileContainer,
  Header,
  ProfileHeader,
  AvatarSection,
  AvatarImage,
  EditProfileButton,
  UserInfo,
  StatsContainer,
  EditForm,
  SaveButton,
  FollowActionButton,
  TitsSection,
  AvatarFallback,
  EditLabel
} from './styles'
import {
  PostCard,
  PostAvatar,
  PostContent,
  PostHeader,
  PostBody,
  EmptyStateText,
} from '../Home/styles'

export function ProfilePage() {
  const { username } = useParams<{ username?: string }>()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [userTits, setUserTits] = useState<Tit[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Formulário de edição
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadProfileData() {
      setLoading(true)
      try {
        // 1. Carrega dados do usuário logado para saber quem está navegando
        const meResponse = await api.get<Profile>('profiles/me/')
        setCurrentUser(meResponse.data)

        // 2. Determina qual perfil carregar (se passado na URL ou se é o 'me')
        let targetProfile = meResponse.data

        if (username && username !== meResponse.data.username) {
          const profileResponse = await api.get<Profile>(`profiles/${username}/`)
          targetProfile = profileResponse.data
        }

        setProfile(targetProfile)
        setDisplayName(targetProfile.display_name || '')
        setBio(targetProfile.bio || '')

        // 3. Busca todos os Tits e filtra pelos Tits do perfil visualizado
        const titsResponse = await api.get('tits/')
        const allTits: any[] = Array.isArray(titsResponse.data)
          ? titsResponse.data
          : titsResponse.data.results || []

        const profileUsername = targetProfile.username

        const myTits = allTits.filter((tit) => {
          const authorName =
            typeof tit.author === 'string'
              ? tit.author
              : tit.author?.username || tit.author_profile?.username

          return authorName === profileUsername
        })

        setUserTits(myTits)
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [username])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!profile || isSaving) return

    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append('display_name', displayName)
      formData.append('bio', bio)

      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      const response = await api.patch<Profile>(
        `profiles/${profile.username}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setProfile(response.data)
      setAvatarFile(null)
      setAvatarPreview(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Ação de Seguir / Deixar de Seguir
  const handleFollowToggle = async () => {
    if (!profile || !currentUser) return

    const targetUsername = profile.username

    try {
      await api.post(`profiles/${targetUsername}/follow/`)

      // Recarrega o perfil atual e o perfil visitado para atualizar contadores
      const [meRes, profileRes] = await Promise.all([
        api.get<Profile>('profiles/me/'),
        api.get<Profile>(`profiles/${targetUsername}/`),
      ])

      setCurrentUser(meRes.data)
      setProfile(profileRes.data)
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error)
    }
  }

  if (loading) {
    return (
      <LayoutContainer>
        <Sidebar />
        <ProfileContainer>
          <EmptyStateText>Carregando perfil...</EmptyStateText>
        </ProfileContainer>
      </LayoutContainer>
    )
  }

  // Verifica se o perfil visualizado é do próprio usuário logado
  const isOwnProfile = currentUser?.username === profile?.username

  // Verifica se o usuário logado está seguindo este perfil
  const isFollowing = currentUser?.following?.some(
    (f: any) => f === profile?.id || f.id === profile?.id
  )

  return (
    <LayoutContainer>
      <Sidebar />
      <ProfileContainer>
        <Header>
          <h2>{profile?.display_name || profile?.username}</h2>
        </Header>

        <ProfileHeader>
          <AvatarSection>
            <AvatarImage>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" />
              ) : profile?.avatar ? (
                <img src={profile.avatar} alt={profile.display_name} />
              ) : (
                profile?.display_name?.[0] || profile?.username?.[0] || 'T'
              )}
            </AvatarImage>

            {isOwnProfile ? (
              <EditProfileButton onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar perfil'}
              </EditProfileButton>
            ) : (
              <FollowActionButton
                $isFollowing={isFollowing}
                onClick={handleFollowToggle}
              >
                <span className="text-default">
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </span>
                <span className="text-hover">Deixar de seguir</span>
              </FollowActionButton>
            )}
          </AvatarSection>

          <UserInfo>
            <h3>{profile?.display_name || 'sem nome ainda ;/'}</h3>
            <span>@{profile?.username}</span>
            {profile?.bio && <p>{profile.bio}</p>}

            <StatsContainer>
              <span>
                <strong>{profile?.following_count || 0}</strong> Seguindo
              </span>
              <span>
                <strong>{profile?.followers_count || 0}</strong> Seguidores
              </span>
            </StatsContainer>
          </UserInfo>

          {/* Form de Edição (Apenas para o próprio perfil) */}
          {isEditing && isOwnProfile && (
            <EditForm onSubmit={handleSaveProfile}>
              <EditLabel>
                Foto de perfil:
              </EditLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />

              <input
                type="text"
                placeholder="Nome de exibição"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <textarea
                placeholder="Escreva sua bio marciana..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <SaveButton type="submit" disabled={isSaving}>
                {isSaving ? 'Salvando...' : 'Salvar'}
              </SaveButton>
            </EditForm>
          )}
        </ProfileHeader>

        {/* Tits do Usuário */}
        <TitsSection>
          {userTits.length === 0 ? (
            <EmptyStateText>Nenhum Tit publicado ainda.</EmptyStateText>
          ) : (
            userTits.map((tit: any) => {
              const authorName =
                typeof tit.author === 'string'
                  ? tit.author
                  : tit.author_profile?.display_name ||
                    tit.author?.username ||
                    profile?.username ||
                    'Marciano'

              const avatarUrl =
                tit.author_avatar ||
                tit.author_profile?.avatar ||
                profile?.avatar

              return (
                <PostCard key={tit.id}>
                  <PostAvatar>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={authorName} />
                    ) : (
                      <AvatarFallback>{authorName[0]?.toUpperCase() || 'M'}</AvatarFallback>
                    )}
                  </PostAvatar>
                  <PostContent>
                    <PostHeader>
                      <strong>{authorName}</strong>
                      <span>@{profile?.username}</span>
                    </PostHeader>
                    <PostBody>{tit.content}</PostBody>
                  </PostContent>
                </PostCard>
              )
            })
          )}
        </TitsSection>
      </ProfileContainer>
    </LayoutContainer>
  )
}