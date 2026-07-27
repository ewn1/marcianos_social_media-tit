import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
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
        const allTits: any[] = Array.isArray(titsResponse.data)
          ? titsResponse.data
          : titsResponse.data.results || []

        // Filtra os Tits garantindo suporte a string ("codefather") ou objeto
        const myTits = allTits.filter((tit) => {
          const authorName =
            typeof tit.author === 'string'
              ? tit.author
              : tit.author?.username || tit.author_profile?.username

          return authorName === profileResponse.data.username
        })

        setUserTits(myTits)
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      // Cria preview local para feedback instantâneo ao usuário
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!profile || isSaving) return

    setIsSaving(true)

    try {
      // Envio multipart/form-data para suportar arquivos de imagem
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
                profile?.display_name?.[0] || 'Tit User'
              )}
            </AvatarImage>

            <EditProfileButton onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancelar' : 'Editar perfil'}
            </EditProfileButton>
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

          {/* Form de Edição */}
          {isEditing && (
            <EditForm onSubmit={handleSaveProfile}>
              <label style={{ fontSize: '0.85rem', color: '#71767b' }}>
                Foto de perfil:
              </label>
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
        <div style={{ padding: '1rem 0' }}>
          {userTits.length === 0 ? (
            <EmptyStateText>Você ainda não publicou nenhum Tit.</EmptyStateText>
          ) : (
            userTits.map((tit: any) => {
              // Mapeamento dinâmico do nome e da imagem do autor
              const authorName =
                typeof tit.author === 'string'
                  ? tit.author
                  : tit.author_profile?.display_name ||
                    tit.author?.username ||
                    profile?.username ||
                    'codefather'

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
                      <div>{authorName[0]?.toUpperCase() || 'C'}</div>
                    )}
                  </PostAvatar>
                  <PostContent>
                    <PostHeader>
                      <strong>{authorName}</strong>
                      <span>@{authorName}</span>
                    </PostHeader>
                    <PostBody>{tit.content}</PostBody>
                  </PostContent>
                </PostCard>
              )
            })
          )}
        </div>
      </ProfileContainer>
    </LayoutContainer>
  )
}