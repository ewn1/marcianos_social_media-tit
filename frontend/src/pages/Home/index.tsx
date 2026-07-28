import { useState, useEffect, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import api from '../../services/api'
import { Tit, Comment, Profile } from '../../types'
import {
  LayoutContainer,
  FeedContainer,
  Header,
  CreateTitBox,
  PublishActions,
  PublishButton,
  PostCard,
  PostAvatar,
  PostContent,
  PostHeader,
  PostBody,
  PostFooter,
  LikeButton,
  CommentButton,
  CommentsSection,
  CommentBox,
  CommentItem,
  EmptyStateText,
} from './styles'

export function Home() {
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<Tit[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  // estado para gerenciamento dos comentários
  const [activeTitComments, setActiveTitComments] = useState<number | null>(null)
  const [commentsMap, setCommentsMap] = useState<Record<number, Comment[]>>({})
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca o perfil logado e apenas o feed de quem o usuário segue (?feed=true)
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

  const handleLike = async (titId: number) => {
    try {
      const response = await api.post(`tits/${titId}/like/`)
      const isNowLiked = response.status === 201 || response.data.message === 'Tit curtido!'

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === titId) {
            return {
              ...post,
              is_liked: isNowLiked,
              likes_count: isNowLiked
                ? post.likes_count + 1
                : Math.max(0, post.likes_count - 1),
            }
          }
          return post
        })
      )
    } catch (error) {
      console.error('Erro ao curtir Tit:', error)
    }
  }

  // Alterna a exibição dos comentários e busca na API do Django
  const toggleComments = async (titId: number) => {
    if (activeTitComments === titId) {
      setActiveTitComments(null)
      return
    }

    setActiveTitComments(titId)

    // Se ainda não buscou os comentários deste Tit, faz o GET no Django
    if (!commentsMap[titId]) {
      try {
        const response = await api.get<Comment[]>(`comments/?tit=${titId}`)
        const commentsData = Array.isArray(response.data)
          ? response.data
          : (response.data as any).results || []

        setCommentsMap((prev) => ({ ...prev, [titId]: commentsData }))
      } catch (error) {
        console.error('Erro ao carregar comentários:', error)
      }
    }
  }

  // Envia um novo comentário para a API do Django
  const handleAddComment = async (e: SyntheticEvent, titId: number) => {
    e.preventDefault()
    if (!commentText.trim() || isSubmittingComment) return

    setIsSubmittingComment(true)

    try {
      const response = await api.post<Comment>('comments/', {
        tit: titId,
        content: commentText,
      })

      const commentData = response.data as any

      const newComment = {
        ...commentData,
        author:
          commentData.author ||
          commentData.user?.username ||
          currentUser?.username ||
          'codefather',
      }

      // Adiciona o comentário na lista do Tit
      setCommentsMap((prev) => ({
        ...prev,
        [titId]: [...(prev[titId] || []), newComment],
      }))

      // Incrementa o contador de comentários no Tit
      setPosts((prev) =>
        prev.map((p) =>
          p.id === titId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p
        )
      )

      setCommentText('')
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
    } finally {
      setIsSubmittingComment(false)
    }
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
            <PublishButton type="submit" disabled={!content.trim() || isSubmitting}>
              {isSubmitting ? 'Publicando...' : 'Publicar Tit'}
            </PublishButton>
          </PublishActions>
        </CreateTitBox>

        {loading ? (
          <EmptyStateText>Carregando Tit's...</EmptyStateText>
        ) : !Array.isArray(posts) || posts.length === 0 ? (
          <EmptyStateText>
            Nenhum Tit para visualizar. Siga outros titers para ver publicações aqui! 
            @codefather é uma ótima sugestão para começar a seguir :D
          </EmptyStateText>
        ) : (
          posts.map((post: any) => {
            // Mapeamento dinâmico para dados do autor e avatar
            const authorUsername =
              typeof post.author === 'string'
                ? post.author
                : post.author_profile?.username ||
                  post.author?.username ||
                  currentUser?.username ||
                  'codefather'

            const authorDisplayName =
              post.author_profile?.display_name || authorUsername

            const avatarUrl =
              post.author_avatar ||
              post.author_profile?.avatar ||
              post.author?.avatar

            return (
              <PostCard key={post.id}>
                <PostAvatar 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => navigate(`/profile/${authorUsername}`)}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={authorDisplayName} />
                  ) : (
                    <div>{authorDisplayName[0]?.toUpperCase() || 'C'}</div>
                  )}
                </PostAvatar>

                <PostContent>
                  <PostHeader 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => navigate(`/profile/${authorUsername}`)}
                  >
                    <strong>{authorDisplayName}</strong>
                    <span>@{authorUsername}</span>
                  </PostHeader>
                  <PostBody>{post.content}</PostBody>

                  <PostFooter>
                    <LikeButton
                      $isLiked={post.is_liked}
                      onClick={() => handleLike(post.id)}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{post.likes_count || 0}</span>
                    </LikeButton>

                    <CommentButton onClick={() => toggleComments(post.id)}>
                      <svg viewBox="0 0 24 24">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                      </svg>
                      <span>{post.comments_count || 0}</span>
                    </CommentButton>
                  </PostFooter>

                  {/* Seção de comentários retrátil */}
                  {activeTitComments === post.id && (
                    <CommentsSection>
                      <CommentBox onSubmit={(e) => handleAddComment(e, post.id)}>
                        <input
                          type="text"
                          placeholder="Escreva um comentário..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                          type="submit"
                          disabled={!commentText.trim() || isSubmittingComment}
                        >
                          Responder
                        </button>
                      </CommentBox>

                      {commentsMap[post.id]?.length === 0 ? (
                        <p style={{ color: '#71767b', fontSize: '0.85rem' }}>
                          Nenhum comentário ainda. Seja o primeiro a responder!
                        </p>
                      ) : (
                        commentsMap[post.id]?.map((comment: any) => {
                          const commentAuthor =
                            typeof comment.author === 'string'
                              ? comment.author
                              : comment.author?.username ||
                                comment.user?.username ||
                                currentUser?.username ||
                                'codefather'

                          return (
                            <CommentItem key={comment.id}>
                              <div>
                                <strong>@{commentAuthor}:</strong>{' '}
                                <span>{comment.content}</span>
                              </div>
                            </CommentItem>
                          )
                        })
                      )}
                    </CommentsSection>
                  )}
                </PostContent>
              </PostCard>
            )
          })
        )}
      </FeedContainer>
    </LayoutContainer>
  )
}