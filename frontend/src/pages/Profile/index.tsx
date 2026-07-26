import { useState, useEffect, SyntheticEvent } from 'react'
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
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userTits, setUserTits] = useState<Tit[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Formulário de edição
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadProfileData() {
      try {
        // Busca os dados do perfil logado
        const profileResponse = await api.get<Profile>('profiles/me/')
        setProfile(profileResponse.data)
        setDisplayName(profileResponse.data.display_name || '')
        setBio(profileResponse.data.bio || '')

        // Busca todos os Tits e filtra pelos Tits do usuário logado
        const titsResponse = await api.get('tits/')
        const allTits: Tit[] = Array.isArray(titsResponse.data)
          ? titsResponse.data
          : titsResponse.data.results || []

        const myTits = allTits.filter(
          (tit) => tit.author?.id === profileResponse.data.user?.id
        )
        setUserTits(myTits)
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [])

  const handleSaveProfile = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!profile || isSaving) return

    setIsSaving(true)

    try {
      // Faz o PATCH para atualizar os dados no backend
      const response = await api.patch<Profile>(`profiles/${profile.user.username}/`, {
        display_name: displayName,
        bio: bio,
      })

      setProfile(response.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <LayoutContainer>
        <Sidebar />
        <ProfileContainer>
          <EmptyStateText>Carregando perfil do Marciano...</EmptyStateText>
        </ProfileContainer>
      </LayoutContainer>
    )
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <ProfileContainer>
        <Header>
          <h2>{profile?.display_name || profile?.user?.username}</h2>
        </Header>

        <ProfileHeader>
          <AvatarSection>
            <AvatarImage>
              {profile?.avatar ? (
                <img src={profile.avatar} alt={profile.display_name} />
              ) : (
                profile?.display_name?.[0] || 'M'
              )}
            </AvatarImage>
            <EditProfileButton onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancelar' : 'Editar perfil'}
            </EditProfileButton>
          </AvatarSection>

          <UserInfo>
            <h3>{profile?.display_name || 'Marciano sem nome'}</h3>
            <span>@{profile?.user?.username}</span>
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

          {/* Form de Edição */}
          {isEditing && (
            <EditForm onSubmit={handleSaveProfile}>
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
        <div style={{ padding: '1rem 0' }}>
          {userTits.length === 0 ? (
            <EmptyStateText>Você ainda não publicou nenhum Tit.</EmptyStateText>
          ) : (
            userTits.map((tit) => (
              <PostCard key={tit.id}>
                <PostAvatar>
                  {tit.author_profile?.avatar ? (
                    <img
                      src={tit.author_profile.avatar}
                      alt={tit.author_profile.display_name}
                    />
                  ) : (
                    <div>{tit.author_profile?.display_name?.[0] || 'M'}</div>
                  )}
                </PostAvatar>
                <PostContent>
                  <PostHeader>
                    <strong>{tit.author_profile?.display_name || 'Marciano'}</strong>
                    <span>@{tit.author_profile?.user?.username || 'marciano'}</span>
                  </PostHeader>
                  <PostBody>{tit.content}</PostBody>
                </PostContent>
              </PostCard>
            ))
          )}
        </div>
      </ProfileContainer>
    </LayoutContainer>
  )
}