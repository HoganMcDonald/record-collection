import * as React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  height: 3rem;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem;
  line-height: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accentDark};
`

interface ButtonProps {
  label: string
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  label,
}) => (
  <ButtonContainer className={className} aria-label={label} onClick={onClick}>
    {children}
  </ButtonContainer>
)

export default Button
