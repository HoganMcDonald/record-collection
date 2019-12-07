import * as React from 'react'
import styled from 'styled-components'
import { useToasts } from '../reducers/toast'
import { ResetButton } from './styled'
import { useInterval } from '../lib/useInterval'

const Body = styled.div`
  padding: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
`

const Header = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentDark};
`
const ToastContainer = styled.div`
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.accentDark};
  border-radius: 4px;
  overflow: hidden;
`

const ToastsContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  max-height: 100%;
  width: 12rem;
  overflow: scroll;
`

interface ToastProps {
  autoClose: boolean
  id: string
  message: string
}

const Toast: React.FC<ToastProps> = ({ autoClose, id, message }) => {
  const [hover, setHover] = React.useState(false)
  const { removeToast } = useToasts()

  useInterval(() => removeToast(id), hover || !autoClose ? null : 4000)

  return (
    <ToastContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Header>
        <ResetButton onClick={() => removeToast(id)}>&times;</ResetButton>
      </Header>
      <Body>{message}</Body>
    </ToastContainer>
  )
}

const Toasts: React.FC = () => {
  const { toasts } = useToasts()
  return (
    <ToastsContainer>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastsContainer>
  )
}

export default Toasts
