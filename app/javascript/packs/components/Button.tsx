import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const buttonStyles = css`
  height: 3rem;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem;
  line-height: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.accentDark};
`

const ButtonContainer = styled.button`
  ${buttonStyles}
`

const LinkContainer = styled(Link)`
  ${buttonStyles}
`

const ExternalLinkContainer = styled.a`
  ${buttonStyles}
`

interface ButtonProps {
  label: string
  className?: string
  onClick?: (event: React.MouseEvent) => void
  href?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  label,
  href,
}) => {
  const containerProps = {
    className,
    'aria-label': label,
    onClick,
    href,
  }

  if (!href) {
    return <ButtonContainer {...containerProps}>{children}</ButtonContainer>
  } else if (href.startsWith('/')) {
    return (
      <LinkContainer {...containerProps} to={href}>
        {children}
      </LinkContainer>
    )
  } else {
    return (
      <ExternalLinkContainer {...containerProps}>
        {children}
      </ExternalLinkContainer>
    )
  }
}

export default Button
