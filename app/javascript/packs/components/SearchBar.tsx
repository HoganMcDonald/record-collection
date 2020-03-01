import * as React from 'react'
import styled from 'styled-components'

import { useDebouncedCallback } from 'use-debounce'
import { Search } from './icons'
import { useSearch } from '../reducers/search'

const SearchBarContainer = styled.div`
  position: relative;
  display: inline-block;
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
  const { search } = useSearch()
  const [value, setValue] = React.useState('')

  const [handleChange] = useDebouncedCallback(() => {
    if (value) {
      search(value)
    }
  }, 200)

  return (
    <SearchBarContainer>
      <SearchInput
        value={value}
        onChange={event => {
          setValue(event.target.value)
          handleChange()
        }}
      />
      <SearchIcon />
    </SearchBarContainer>
  )
}

export default SearchBar
