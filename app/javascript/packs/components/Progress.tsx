import * as React from 'react'
import styled, { css } from 'styled-components'

const DragContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  transform: translateX(-50%);
`

const PlayHead = styled.div<{ hover: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ theme }) => theme.colors.accentDark};
  cursor: pointer;
  border-radius: 999px;
  transition: all 170ms ease-out;
  ${({ hover }) =>
    hover
      ? css`
          transform: scale(2);
        `
      : null}
`

const ProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

interface ProgressBarProps {
  grabbed: boolean
  progress: number
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: 100%;
  max-width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.colors.progressBar};
  border-bottom-right-radius: 999px;
  border-top-right-radius: 999px;
  ${({ grabbed }) =>
    !grabbed &&
    css`
      transition: max-width 1000ms linear;
    `}
`

interface ProgressProps {
  progress: number
  onPlayHeadChange: (position: number) => void
}

const Progress: React.FC<ProgressProps> = ({ progress, onPlayHeadChange }) => {
  const container = React.useRef<HTMLDivElement>(null)
  const [grabbed, setGrabbed] = React.useState(false)
  const [dragPosition, setDragPosition] = React.useState<number>(null)
  const [hover, setHover] = React.useState(false)

  const startDrag = () => {
    setGrabbed(true)
    setDragPosition(progress)
  }

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const position = (event.clientX / container.current.offsetWidth) * 100
      setDragPosition(position)
    }

    const handleLetGo = (event: MouseEvent) => {
      setGrabbed(false)
      onPlayHeadChange((event.clientX / container.current.offsetWidth) * 100)
      setDragPosition(null)
    }

    if (grabbed) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleLetGo)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleLetGo)
    }
  }, [grabbed])

  return (
    <ProgressContainer ref={container}>
      <ProgressBar
        grabbed={grabbed}
        progress={grabbed ? dragPosition : progress}
      />
      <DragContainer onMouseDown={startDrag}>
        <PlayHead
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          hover={hover || grabbed}
        />
      </DragContainer>
    </ProgressContainer>
  )
}

export default Progress
