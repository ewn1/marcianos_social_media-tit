import { useState, useEffect, SyntheticEvent } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { TitCard } from '../../components/TitCard'
import api from '../../services/api'
import { Tit, Profile } from '../../types'
import {
  LayoutContainer,
  FeedContainer,
  Header,
  CreateTitBox,
  PublishActions,
  PublishButton,
  EmptyStateText,
} from './styles'

export function Home() {
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<Tit[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, titsResponse] = await Promise.all([
          api.get<Profile>('profiles/me/'),
          api.get('tits/?feed=true'),
        ])

        setCurrentUser(userResponse.data)

        const titsData = Array.isArray(titsResponse.data)
          ? titsResponse.data
          : titsResponse.data.results || []

        setPosts(titsData)
      } catch (error) {
        console.error('Erro ao carregar dados da Home:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePublish = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await api.post<Tit>('tits/', { content })
      setPosts((prevPosts) => [response.data, ...prevPosts])
      setContent('')
    } catch (error) {
      console.error('Erro ao publicar Tit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTit = (updatedTit: Tit) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedTit.id ? updatedTit : p)),
    )
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <FeedContainer>
        <Header>
          <h2>Página Inicial</h2>
        </Header>

        <CreateTitBox onSubmit={handlePublish}>
          <textarea
            placeholder="O que está acontecendo no espaço?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <PublishActions>
            <PublishButton
              type="submit"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Tit'}
            </PublishButton>
          </PublishActions>
        </CreateTitBox>

        {loading ? (
          <EmptyStateText>Carregando Tit's...</EmptyStateText>
        ) : !Array.isArray(posts) || posts.length === 0 ? (
          <EmptyStateText>
            Nenhum Tit para visualizar. Siga outros titers para ver publicações
            aqui! @codefather é uma ótima sugestão para começar a seguir :D
          </EmptyStateText>
        ) : (
          posts.map((post) => (
            <TitCard
              key={post.id}
              tit={post}
              currentUser={currentUser}
              onUpdateTit={handleUpdateTit}
            />
          ))
        )}
      </FeedContainer>
    </LayoutContainer>
  )
}
