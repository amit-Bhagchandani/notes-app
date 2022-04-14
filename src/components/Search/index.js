import React from 'react'
import { MdSearch } from 'react-icons/md'
import styles from './Search.module.css'

const Search = ( { setSearchValue } ) => {
  return (
    <div className= {styles.search}>
        <MdSearch className= {styles.searchIcon} size = '1.4rem' />
        <input onChange={ (e) => setSearchValue(e.target.value) } type = 'text' placeholder='search notes...'/>
    </div>
  )
}

export default Search