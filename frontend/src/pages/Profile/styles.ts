import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`

export const ProfileContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-width: 320px;
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`

export const ProfileHeader = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

export const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

export const AvatarImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  border: 4px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const EditProfileButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBackgroundHover};
  }
`

export const UserInfo = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.25rem;
    margin: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    margin: 0.75rem 0;
    line-height: 1.4;
  }
`

export const StatsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  input,
  textarea {
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`

export const EditLabel = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 0.6rem 1.25rem;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const FollowActionButton = styled.button<{ $isFollowing?: boolean }>`
  background-color: ${({ theme, $isFollowing }) => ($isFollowing ? 'transparent' : theme.colors.text)};
  color: ${({ theme, $isFollowing }) => ($isFollowing ? theme.colors.text : theme.colors.background)};
  border: 1px solid ${({ theme, $isFollowing }) => ($isFollowing ? theme.colors.border : 'transparent')};
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 130px;
  text-align: center;
  transition: all 0.2s ease-in-out;

  .text-default {
    display: inline;
  }
  .text-hover {
    display: none;
  }

  &:hover {
    ${({ theme, $isFollowing }) =>
      $isFollowing
        ? `
        background-color: rgba(244, 33, 46, 0.1) !important;
        color: ${theme.colors.danger} !important;
        border-color: ${theme.colors.danger} !important;

        .text-default {
          display: none;
        }
        .text-hover {
          display: inline;
        }
      `
        : `
        opacity: 0.9 !important;
      `}
  }
`

export const TitsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const AvatarFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`

export const PostCard = styled.div`
  display: flex;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.cardBackgroundHover};
    border-color: ${({ theme }) => theme.colors.border};
  }
`

export const PostAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

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
  gap: 0.5rem;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
  }
`

export const PostBody = styled.p`
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme, $isLiked }) => ($isLiked ? theme.colors.like : theme.colors.textSecondary)};
  font-size: 0.85rem;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
    fill: ${({ theme, $isLiked }) => ($isLiked ? theme.colors.like : 'none')};
    stroke: ${({ theme, $isLiked }) => ($isLiked ? theme.colors.like : 'currentColor')};
    stroke-width: 2;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.like};
    svg {
      stroke: ${({ theme }) => theme.colors.like};
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
  color: ${({ theme }) => theme.colors.textSecondary};
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
    color: ${({ theme }) => theme.colors.primary};
    svg {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const CommentsSection = styled.div`
  margin-top: 1rem;
  padding-top: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const CommentBox = styled.form`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.85rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
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
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 0.6rem 0.875rem;
  font-size: 0.85rem;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

export const EmptyStateText = styled.p`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`