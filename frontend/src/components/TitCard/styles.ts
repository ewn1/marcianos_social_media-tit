import styled from 'styled-components'

export const PostCard = styled.div`
  display: flex;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  margin-bottom: 1rem;
  gap: 0.75rem;
  transition: background-color 0.2s;

  @media (max-width: 480px) {
    padding: 0.85rem;
    border-radius: 12px;
    gap: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBackgroundHover};
  }
`

export const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }

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
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`

export const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.2rem 0.4rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;

    @media (max-width: 480px) {
      font-size: 0.9rem;
      max-width: 140px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`

export const PostBody = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export const PostFooter = styled.div`
  display: flex;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
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
  color: ${({ theme, $isLiked }) =>
    $isLiked ? theme.colors.like : theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: ${({ theme, $isLiked }) =>
      $isLiked ? theme.colors.like : 'currentColor'};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.like};
    svg {
      fill: ${({ theme }) => theme.colors.like};
    }
  }
`

export const CommentButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const CommentsSection = styled.div`
  margin-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const CommentBox = styled.form`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }

  input {
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 9999px;
    padding: 0.4rem 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.85rem;

    @media (max-width: 480px) {
      border-radius: 8px;
      padding: 0.5rem 0.8rem;
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;

    @media (max-width: 480px) {
      border-radius: 8px;
      padding: 0.5rem;
      width: 100%;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`

export const CommentItem = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  word-break: break-word;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const NoCommentsText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  margin: 0;
`
