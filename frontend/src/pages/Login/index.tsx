import { useState, SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  Container,
  LoginCard,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Button,
  ErrorText,
  FooterText,
} from './styles'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ username, password })
      navigate('/')
    } catch (err) {
      setError('Usuário ou senha inválidos. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <LoginCard>
        <Title>True is Tough</Title>
        <Subtitle>Entre para ver o que os Marcianos estão aprontando.</Subtitle>

        {error && <ErrorText>{error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
        <FooterText>
          Ainda não tem uma conta no True is Tough?{' '}
          <Link to="/register">Cadastre-se, my friend</Link>
        </FooterText>
      </LoginCard>
    </Container>
  )
}