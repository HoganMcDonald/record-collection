import * as React from 'react'
import styled, { ThemeContext } from 'styled-components'

interface IconProps {
  className?: string
}

export const AdvanceCarousel: React.FC<IconProps & { disabled: boolean }> = ({
  className,
  disabled,
}) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg className={className} width="10px" height="17px" viewBox="0 0 8 13">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-967.000000, -76.000000)">
          <g transform="translate(203.000000, 0.000000)">
            <rect fill="#11051B" x="0" y="0" width="821" height="580"></rect>
            <g
              transform="translate(24.000000, 76.000000)"
              fill={disabled ? colors.gray : colors.icons}
              fillRule="nonzero">
              <polygon points="741.517671 0 748 6.5 741.517671 13 740 11.4781923 744.964888 6.5 740 1.52180768"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const RetreatCarousel = styled(AdvanceCarousel)`
  transform: rotate(180deg);
`

export const NextSong: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg className={className} width="12px" height="16px" viewBox="0 0 12 16">
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

export const Pause: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-500.000000, -598.000000)">
          <g transform="translate(-1.000000, 580.000000)">
            <g
              transform="translate(467.000000, 18.000000)"
              fill={colors.white}
              fillRule="nonzero">
              <g transform="translate(34.000000, 0.000000)">
                <path d="M7.71428571,24 L2.57142857,24 C1.15178571,24 0,22.8482143 0,21.4285714 L0,2.57142857 C0,1.15178571 1.15178571,0 2.57142857,0 L7.71428571,0 C9.13392857,0 10.2857143,1.15178571 10.2857143,2.57142857 L10.2857143,21.4285714 C10.2857143,22.8482143 9.13392857,24 7.71428571,24 Z M24,21.4285714 L24,2.57142857 C24,1.15178571 22.8482143,0 21.4285714,0 L16.2857143,0 C14.8660714,0 13.7142857,1.15178571 13.7142857,2.57142857 L13.7142857,21.4285714 C13.7142857,22.8482143 14.8660714,24 16.2857143,24 L21.4285714,24 C22.8482143,24 24,22.8482143 24,21.4285714 Z"></path>
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

export const Search: React.FC<IconProps> = ({ className }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <svg className={className} width="20px" height="20px" viewBox="0 0 14 14">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={colors.gray} fillRule="nonzero">
          <path
            d="M13.8085937,12.1050781 L11.0824219,9.37890625 C10.959375,9.25585938 10.7925781,9.1875 10.6175781,9.1875 L10.171875,9.1875 C10.9265625,8.22226563 11.375,7.00820313 11.375,5.6875 C11.375,2.54570313 8.82929687,0 5.6875,0 C2.54570313,0 0,2.54570313 0,5.6875 C0,8.82929688 2.54570312,11.375 5.6875,11.375 C7.00820312,11.375 8.22226562,10.9265625 9.1875,10.171875 L9.1875,10.6175781 C9.1875,10.7925781 9.25585937,10.959375 9.37890625,11.0824219 L12.1050781,13.8085938 C12.3621094,14.065625 12.7777344,14.065625 13.0320312,13.8085938 L13.8058594,13.0347656 C14.0628906,12.7777344 14.0628906,12.3621094 13.8085937,12.1050781 Z M5.6875,9.1875 C3.75429688,9.1875 2.1875,7.6234375 2.1875,5.6875 C2.1875,3.75429687 3.7515625,2.1875 5.6875,2.1875 C7.62070312,2.1875 9.1875,3.7515625 9.1875,5.6875 C9.1875,7.62070312 7.6234375,9.1875 5.6875,9.1875 Z"
            id="Shape"></path>
        </g>
      </g>
    </svg>
  )
}

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
