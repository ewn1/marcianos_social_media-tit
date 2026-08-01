import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { TitCard } from '../../components/TitCard'
import { FollowListModal } from '../../components/FollowListModal'
import { ChangePasswordModal } from '../../components/ChangePasswordModal'
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
  StatItem,
  EditForm,
  SaveButton,
  FollowActionButton,
  TitsSection,
  AvatarFallback,
  EditLabel,
  PasswordButtonContainer,
  PasswordButton,
} from './styles'
import { EmptyStateText } from '../Home/styles'

export function ProfilePage() {
  const { username } = useParams<{ username?: string }>()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [myFollowingIds, setMyFollowingIds] = useState<(string | number)[]>([])
  const [userTits, setUserTits] = useState<Tit[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  // Estados do Modal de Seguidores/Seguindo
  const [modalType, setModalType] = useState<'followers' | 'following' | null>(
    null,
  )
  const [modalUsers, setModalUsers] = useState<Profile[]>([])
  const [loadingModal, setLoadingModal] = useState(false)

  // Formulário de edição de perfil
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadProfileData() {
      setLoading(true)
      try {
        const meResponse = await api.get<Profile>('profiles/me/')
        setCurrentUser(meResponse.data)

        // Busca a lista real de quem o usuário logado segue
        const followingResponse = await api.get(
          `profiles/${meResponse.data.username}/following/`,
        )
        const followingData = Array.isArray(followingResponse.data)
          ? followingResponse.data
          : followingResponse.data.results || []

        setMyFollowingIds(
          followingData.map((f: any) => f.id || f.username || f),
        )

        let targetProfile = meResponse.data

        if (username && username !== meResponse.data.username) {
          const profileResponse = await api.get<Profile>(
            `profiles/${username}/`,
          )
          targetProfile = profileResponse.data
        }

        setProfile(targetProfile)
        setDisplayName(targetProfile.display_name || '')
        setBio(targetProfile.bio || '')

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

      // Atualiza dados do perfil via PATCH
      const response = await api.patch<Profile>(
        `profiles/${profile.username}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      setProfile(response.data)
      alert('Perfil atualizado com sucesso!')

      setAvatarFile(null)
      setAvatarPreview(null)
      setIsEditing(false)
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error)
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        'Erro ao atualizar dados.'
      alert(errorMsg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFollowToggle = async () => {
    if (!profile || !currentUser) return

    const targetUsername = profile.username

    try {
      await api.post(`profiles/${targetUsername}/follow/`)

      // Atualiza em paralelo o perfil alvo, o usuário logado e a lista de quem o usuário logado segue
      const [profileRes, followingRes] = await Promise.all([
        api.get<Profile>(`profiles/${targetUsername}/`),
        api.get(`profiles/${currentUser.username}/following/`),
      ])

      setProfile(profileRes.data)

      const followingData = Array.isArray(followingRes.data)
        ? followingRes.data
        : followingRes.data.results || []
      setMyFollowingIds(followingData.map((f: any) => f.id || f.username || f))
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error)
    }
  }

  const handleOpenModal = async (type: 'followers' | 'following') => {
    if (!profile) return
    setModalType(type)
    setLoadingModal(true)
    try {
      const response = await api.get<Profile[]>(
        `profiles/${profile.username}/${type}/`,
      )
      const data = Array.isArray(response.data)
        ? response.data
        : (response.data as any).results || []
      setModalUsers(data)
    } catch (error) {
      console.error(`Erro ao carregar ${type}:`, error)
      setModalUsers([])
    } finally {
      setLoadingModal(false)
    }
  }

  const handleUpdateTit = (updatedTit: Tit) => {
    setUserTits((prev) =>
      prev.map((p) => (p.id === updatedTit.id ? updatedTit : p)),
    )
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

  const isOwnProfile = currentUser?.username === profile?.username

  // Validação cruzando com a lista real de following obtida da API
  const isFollowing = myFollowingIds.some(
    (idOrUser) =>
      String(idOrUser) === String(profile?.id) ||
      String(idOrUser) === String(profile?.username),
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
                <AvatarFallback>
                  {profile?.display_name?.[0] || profile?.username?.[0] || 'T'}
                </AvatarFallback>
              )}
            </AvatarImage>

            {isOwnProfile ? (
              <EditProfileButton onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar perfil'}
              </EditProfileButton>
            ) : (
              <FollowActionButton
                $isFollowing={Boolean(isFollowing)}
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
              <StatItem onClick={() => handleOpenModal('following')}>
                <strong>{profile?.following_count || 0}</strong> Seguindo
              </StatItem>
              <StatItem onClick={() => handleOpenModal('followers')}>
                <strong>{profile?.followers_count || 0}</strong> Seguidores
              </StatItem>
            </StatsContainer>
          </UserInfo>

          {isEditing && isOwnProfile && (
            <>
              <EditForm onSubmit={handleSaveProfile}>
                <EditLabel>Foto de perfil:</EditLabel>
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
                  placeholder="Escreva sua bio bolada..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <SaveButton type="submit" disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar perfil'}
                </SaveButton>
              </EditForm>

              <PasswordButtonContainer>
                <PasswordButton
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Alterar senha
                </PasswordButton>
              </PasswordButtonContainer>
            </>
          )}
        </ProfileHeader>

        <TitsSection>
          {userTits.length === 0 ? (
            <EmptyStateText>Nenhum Tit publicado ainda.</EmptyStateText>
          ) : (
            userTits.map((tit) => (
              <TitCard
                key={tit.id}
                tit={tit}
                currentUser={currentUser}
                onUpdateTit={handleUpdateTit}
              />
            ))
          )}
        </TitsSection>
      </ProfileContainer>

      {modalType && (
        <FollowListModal
          title={modalType === 'followers' ? 'Seguidores' : 'Seguindo'}
          users={modalUsers}
          loading={loadingModal}
          onClose={() => setModalType(null)}
        />
      )}

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </LayoutContainer>
  )
}
