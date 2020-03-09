import * as React from 'react'
import styled from 'styled-components'

const Thumbnail = styled.img`
  margin: 0;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ThumbnailContainer = styled.div<{ circle?: boolean }>`
  background-color: ${({ theme }) => theme.colors.thumbnail};
  padding-top: 100%;
  position: relative;
`

interface LazyImageProps {
  src: string
  alt?: string
  className?: string
}

const LazyImage: React.FC<LazyImageProps> = ({
  className,
  src,
  alt,
  children,
}) => {
  const [loaded, setLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoaded(false)
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = src
  }, [src])

  return (
    <ThumbnailContainer className={className}>
      <Thumbnail
        src={src}
        alt={alt}
        hidden={!loaded}
        onLoad={() => setLoaded(true)}
      />
      {children}
    </ThumbnailContainer>
  )
}

export default LazyImage
