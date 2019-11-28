import * as React from 'react'
import styled, { ThemeContext } from 'styled-components'

interface IconProps {
  className?: string
}

export const NextSong: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg
      className={className}
      width="12px"
      height="16px"
      viewBox="0 0 12 16"
      version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-547.000000, -602.000000)">
          <g transform="translate(-1.000000, 580.000000)">
            <g
              transform="translate(467.000000, 18.000000)"
              fill={colors.icons}
              fillRule="nonzero">
              <g transform="translate(87.000000, 12.000000) rotate(180.000000) translate(-87.000000, -12.000000) translate(81.000000, 4.000000)">
                <path d="M0,15.5712139 L0,0.428786067 C0,0.193078464 0.2025,0.000226788261 0.45,0.000226788261 L2.25,0.000226788261 C2.4975,0.000226788261 2.7,0.193078464 2.7,0.428786067 L2.7,6.72860747 L10.03125,0.26450501 C10.80375,-0.346191962 12,0.164507845 12,1.14305153 L12,14.8569485 C12,15.8354922 10.80375,16.346192 10.03125,15.735495 L2.7,9.31067713 L2.7,15.5712139 C2.7,15.8069215 2.4975,15.9997732 2.25,15.9997732 L0.45,15.9997732 C0.2025,15.9997732 0,15.8069215 0,15.5712139 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const Play: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg
      className={className}
      width="21px"
      height="24px"
      viewBox="0 0 21 24"
      version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-502.000000, -598.000000)">
          <g transform="translate(-1.000000, 580.000000)">
            <g
              transform="translate(467.000000, 18.000000)"
              fill={colors.icons}
              fillRule="nonzero">
              <g transform="translate(36.000000, 0.000000)">
                <path d="M19.8943044,10.0621514 L3.39384458,0.307859918 C2.05318222,-0.48429542 0,0.284423369 0,2.24371882 L0,21.7476144 C0,23.5053556 1.90786567,24.5646876 3.39384458,23.6834733 L19.8943044,13.9338692 C21.3662204,13.0667169 21.3709081,10.9293037 19.8943044,10.0621514 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const PreviousSong = styled(NextSong)`
  transform: rotate(180deg);
`

export const Speaker: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg
      className={className}
      width="18px"
      height="24px"
      viewBox="0 0 18 24"
      version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-988.000000, -598.000000)">
          <g transform="translate(-1.000000, 580.000000)">
            <g transform="translate(989.000000, 18.000000)">
              <circle fill={colors.icons} cx="9" cy="7" r="2"></circle>
              <rect
                stroke={colors.icons}
                strokeWidth="2"
                x="1"
                y="1"
                width="16"
                height="22"></rect>
              <circle
                stroke={colors.icons}
                strokeWidth="2"
                cx="9"
                cy="16"
                r="3"></circle>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
