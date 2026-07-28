import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`

export const FeedContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  /* Removemos as bordas laterais retas da timeline antiga */
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  padding: 1rem 1.25rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.05);

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors?.text || '#fff'};
  }
`

export const CreateTitBox = styled.form`
  /* Estilo de card flutuante moderno para a caixa de postagem */
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  textarea {
    width: 100%;
    background: transparent;
    border: none;
    resize: none;
    color: ${({ theme }) => theme.colors?.text || '#fff'};
    font-size: 1rem;
    outline: none;
    min-height: 80px;
    font-family: inherit;

    &::placeholder {
      color: ${({ theme }) => theme.colors?.textSecondary || '#71767b'};
    }
  }
`

export const PublishActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

export const PublishButton = styled.button`
  background-color: ${({ theme }) => theme.colors?.primary || '#1d9bf0'};
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 0.6rem 1.5rem;
  font-weight: 700;
  font-size: 0.9rem;
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

export const PostCard = styled.div`
  /* O card do post agora flutua como uma notificação do iOS */
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
`

export const PostAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5s;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  strong {
    color: ${({ theme }) => theme.colors?.text || '#fff'};
    font-size: 0.95rem;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors?.textSecondary || '#71767b'};
    font-size: 0.85rem;
  }
`

export const PostBody = styled.p`
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word;
`

export const PostFooter = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.875rem;
`

export const LikeButton = styled.button<{ $isLiked?: boolean }>`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  color: ${({ $isLiked }) => ($isLiked ? '#f91880' : '#71767b')};
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: ${({ $isLiked }) => ($isLiked ? '#f91880' : 'none')};
    stroke: ${({ $isLiked }) => ($isLiked ? '#f91880' : 'currentColor')};
    stroke-width: 2;
  }

  &:hover {
    color: #f91880;
    svg {
      stroke: #f91880;
    }
  }
`

export const CommentButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  color: #71767b;
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }

  &:hover {
    color: #1d9bf0;
    svg {
      stroke: #1d9bf0;
    }
  }
`

export const CommentsSection = styled.div`
  margin-top: 1rem;
  padding-top: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const CommentBox = styled.form`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors?.text || '#fff'};
    font-size: 0.85rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors?.primary || '#1d9bf0'};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors?.primary || '#1d9bf0'};
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const CommentItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 0.6rem 0.875rem;
  font-size: 0.85rem;

  strong {
    color: ${({ theme }) => theme.colors?.text || '#fff'};
  }

  span {
    color: ${({ theme }) => theme.colors?.textSecondary || '#adb5bd'};
  }
`

export const EmptyStateText = styled.p`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors?.textSecondary || '#71767b'};
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`