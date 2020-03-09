import * as React from 'react'
import ReactLoader from 'react-loader-spinner'
import { useTheme } from 'styled-components'

interface LoaderProps {
  height?: number
}

const Loader: React.FC<LoaderProps> = ({ height }) => {
  const theme = useTheme()
  return (
    <ReactLoader type="ThreeDots" height={height} color={theme.colors.white} />
  )
}

export default Loader
