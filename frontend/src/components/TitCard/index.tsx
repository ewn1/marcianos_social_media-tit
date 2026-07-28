import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { Tit, Comment, Profile } from '../../types'
import {
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
  AvatarFallback,
} from './styles'

interface TitCardProps {
  tit: Tit
  currentUser: Profile | null
  onUpdateTit?: (updatedTit: Tit) => void
}

export function TitCard({ tit, currentUser, onUpdateTit }: TitCardProps) {
  const navigate = useNavigate()

  // Estados locais de curtida e contadores baseados na prop
  const [isLiked, setIsLiked] = useState(tit.is_liked)
  const [likesCount, setLikesCount] = useState(tit.likes_count)
  const [commentsCount, setCommentsCount] = useState(tit.comments_count)

  // Estados de comentários
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  // Mapeamento dinâmico do autor (compatível com Home e Profile)
  const authorUsername =
    typeof tit.author === 'string'
      ? tit.author
      : (tit.author as any)?.username ||
        (tit as any).author_profile?.username ||
        currentUser?.username ||
        'codefather'

  const authorDisplayName =
    (tit as any).author_profile?.display_name ||
    (typeof tit.author === 'object' && (tit.author as any)?.display_name) ||
    authorUsername

  const avatarUrl =
    tit.author_avatar ||
    (tit as any).author_profile?.avatar ||
    (typeof tit.author === 'object' && (tit.author as any)?.avatar) ||
    null

  // Ação de Curtir
  const handleLike = async () => {
    try {
      const response = await api.post(`tits/${tit.id}/like/`)
      const isNowLiked = response.status === 201 || response.data.message === 'Tit curtido!'
      const newLikesCount = isNowLiked ? likesCount + 1 : Math.max(0, likesCount - 1)

      setIsLiked(isNowLiked)
      setLikesCount(newLikesCount)

      if (onUpdateTit) {
        onUpdateTit({ ...tit, is_liked: isNowLiked, likes_count: newLikesCount })
      }
    } catch (error) {
      console.error('Erro ao curtir Tit:', error)
    }
  }

  // Alternar visualização dos comentários
  const toggleComments = async () => {
    const nextState = !showComments
    setShowComments(nextState)

    if (nextState && !commentsLoaded) {
      try {
        const response = await api.get<Comment[]>(`comments/?tit=${tit.id}`)
        const commentsData = Array.isArray(response.data)
          ? response.data
          : (response.data as any).results || []

        setComments(commentsData)
        setCommentsLoaded(true)
      } catch (error) {
        console.error('Erro ao carregar comentários:', error)
      }
    }
  }

  // Adicionar novo comentário
  const handleAddComment = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!commentText.trim() || isSubmittingComment) return

    setIsSubmittingComment(true)

    try {
      const response = await api.post<Comment>('comments/', {
        tit: tit.id,
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

      setComments((prev) => [...prev, newComment])
      const newCommentsCount = commentsCount + 1
      setCommentsCount(newCommentsCount)
      setCommentText('')

      if (onUpdateTit) {
        onUpdateTit({ ...tit, comments_count: newCommentsCount })
      }
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  return (
    <PostCard>
      <PostAvatar
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/profile/${authorUsername}`)}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={authorDisplayName} />
        ) : (
          <AvatarFallback>{authorDisplayName[0]?.toUpperCase() || 'C'}</AvatarFallback>
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

        <PostBody>{tit.content}</PostBody>

        <PostFooter>
          <LikeButton $isLiked={isLiked} onClick={handleLike}>
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{likesCount}</span>
          </LikeButton>

          <CommentButton onClick={toggleComments}>
            <svg viewBox="0 0 24 24">
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
            <span>{commentsCount}</span>
          </CommentButton>
        </PostFooter>

        {showComments && (
          <CommentsSection>
            <CommentBox onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" disabled={!commentText.trim() || isSubmittingComment}>
                Responder
              </button>
            </CommentBox>

            {comments.length === 0 ? (
              <p style={{ color: '#71767b', fontSize: '0.85rem' }}>
                Nenhum comentário ainda. Seja o primeiro a responder!
              </p>
            ) : (
              comments.map((comment: any) => {
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
                      <strong>@{commentAuthor}:</strong> <span>{comment.content}</span>
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
}