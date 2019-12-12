import * as React from 'react'
import styled from 'styled-components'
import { Search } from './icons'

const SearchBarContainer = styled.span`
  position: relative;
`

const SearchInput = styled.input`
  width: 260px;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  padding: 4px 40px 4px 12px;
  background-color: ${({ theme }) => theme.colors.inputs};
  color: ${({ theme }) => theme.colors.white};
  caret-color: ${({ theme }) => theme.colors.accent};
`

const SearchIcon = styled(Search)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`

const SearchBar: React.FC = () => {
  const [value, setValue] = React.useState('')
  return (
    <SearchBarContainer>
      <SearchInput
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <SearchIcon />
    </SearchBarContainer>
  )
}

export default SearchBar
