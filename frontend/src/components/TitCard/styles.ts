import styled from 'styled-components'

export const PostCard = styled.div`
  display: flex;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-bottom: 1rem;
  gap: 0.75rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a1d21; /* Leve destaque ao passar o mouse, opcional */
  }
`

export const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #2f3336;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
`

export const PostContent = styled.div`
  flex: 1;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.25rem;

  strong {
    color: #e7e9ea;
    font-size: 0.95rem;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #71767b;
    font-size: 0.85rem;
  }
`

export const PostBody = styled.p`
  color: #e7e9ea;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  margin-bottom: 0.75rem;
`

export const PostFooter = styled.div`
  display: flex;
  gap: 2rem;
  color: #71767b;
`

interface LikeButtonProps {
  $isLiked?: boolean
}

export const LikeButton = styled.button<LikeButtonProps>`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${(props) => (props.$isLiked ? '#f91880' : '#71767b')};
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => (props.$isLiked ? '#f91880' : 'currentColor')};
  }

  &:hover {
    color: #f91880;
    svg {
      fill: #f91880;
    }
  }
`

export const CommentButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #71767b;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  &:hover {
    color: #1d9bf0;
  }
`

export const CommentsSection = styled.div`
  margin-top: 0.75rem;
  border-top: 1px solid #2f3336;
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const CommentBox = styled.form`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    background: #101214; /* Fundo mais escuro para o input interno */
    border: 1px solid #2f3336;
    border-radius: 9999px;
    padding: 0.4rem 0.9rem;
    color: #e7e9ea;
    font-size: 0.85rem;

    &:focus {
      outline: none;
      border-color: #1d9bf0;
    }
  }

  button {
    background: #1d9bf0;
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #1a8cd8;
    }
  }
`

export const CommentItem = styled.div`
  font-size: 0.85rem;
  color: #e7e9ea;
  background: #101214;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;

  strong {
    color: #1d9bf0;
  }
`