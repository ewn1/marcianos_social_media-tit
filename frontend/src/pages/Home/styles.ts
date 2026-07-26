import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
`

export const FeedContainer = styled.main`
  flex: 1;
  max-width: 650px; /* Aumentamos para dar mais espaço ao feed */
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 100vh;
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 10;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const CreateTitBox = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  textarea {
    width: 100%;
    background: transparent;
    border: none;
    resize: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.125rem;
    font-family: inherit;
    min-height: 90px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`

export const PublishActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`

export const PublishButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  padding: 0.625rem 1.25rem;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const PostCard = styled.article`
  display: flex;
  gap: 0.875rem;
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`

export const PostAvatar = styled.div`
  flex-shrink: 0; /* IMPEDE QUE O AVATAR SEJA ESPREMIDO! */
  width: 44px;
  height: 44px;

  img,
  div {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    background-color: ${({ theme }) => theme.colors.border || '#333'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
  }
`

export const PostContent = styled.div`
  flex: 1;
  min-width: 0; /* Evita vazamento de texto longo fora do container */
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
  flex-wrap: wrap;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary || '#71767b'};
    font-size: 0.875rem;
  }
`

export const PostBody = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word; /* Se o Marciano digitar um texto gigante sem espaço, quebra a linha bonitinho */
  margin: 0;
`

export const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary || '#71767b'};
  text-align: center;
  margin-top: 3rem;
  font-size: 0.95rem;
`

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
`

export const LikeButton = styled.button<{ $isLiked?: boolean }>`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ $isLiked, theme }) =>
    $isLiked ? '#f91880' : theme.colors.textSecondary || '#71767b'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: ${({ $isLiked }) => ($isLiked ? '#f91880' : 'none')};
    stroke: currentColor;
    stroke-width: 2;
  }

  &:hover {
    color: #f91880;
  }
`

export const CommentButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#71767b'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#1d9bf0'};
  }
`

export const CommentsSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`

export const CommentBox = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ theme }) => theme.colors.border || '#333'};
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.text || '#fff'};
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary || '#1d9bf0'};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary || '#1d9bf0'};
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const CommentItem = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.875rem;

  strong {
    color: ${({ theme }) => theme.colors.text || '#fff'};
  }

  p {
    color: ${({ theme }) => theme.colors.text || '#fff'};
    margin: 0.1rem 0 0 0;
  }
`