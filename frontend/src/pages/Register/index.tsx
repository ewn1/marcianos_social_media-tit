import { useState, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  Container,
  RegisterCard,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Button,
  ErrorText,
  FooterText,
} from './styles'

export function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Verifique e tente novamente.')
      return
    }

    setIsSubmitting(true)

    try {
      await register({ username, email, password })
      navigate('/')
    } catch (err) {
      setError('Erro ao criar conta. Usuário ou e-mail já em uso.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <RegisterCard>
        <Title>Junte-se aos Marcianos</Title>
        <Subtitle>Crie sua conta para começar a publicar seus Tit's.</Subtitle>

        {error && <ErrorText>{error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Ex: marciano_code"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <InputGroup>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </Form>

        <FooterText>
          Já tem uma conta? <Link to="/login">Faça Login, my friend</Link>
        </FooterText>
      </RegisterCard>
    </Container>
  )
}