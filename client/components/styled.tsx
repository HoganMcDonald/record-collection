import styled, { css } from 'styled-components'

export const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`

interface ResetButtonProps {
  disabled?: boolean
}

const disabledStyles = css`
  pointer-events: none;
`

export const ResetButton = styled.button<ResetButtonProps>`
  -webkit-appearance: button;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-family: inherit;
  font-size: 100%;
  line-height: 0;
  line-height: 1.15;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  text-transform: none;
  ${({ disabled }) => disabled && `${disabledStyles}`}
`
