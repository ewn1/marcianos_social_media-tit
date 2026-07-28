import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  background-color: #15202b;
  border: 1px solid #38444d;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #38444d;

  h3 {
    color: #fff;
    font-size: 1.1rem;
  }

  button {
    background: transparent;
    border: none;
    color: #8899a6;
    font-size: 1.25rem;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
`

export const ModalContent = styled.div`
  overflow-y: auto;
  padding: 0.5rem 0;
  flex: 1;
`

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #38444d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #fff;
    font-size: 0.95rem;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #8899a6;
    font-size: 0.85rem;
  }
`