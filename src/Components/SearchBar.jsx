import { useState, useEffect } from 'react'
import '../styles/App.css'

function SearchBar({ setFilter, handleSearch }) {
    //onClick={handleSearch}

    //value={query}
    // onChange={(e) => setQuery(e.target.value)}

  return (
    <div className='search-bar'>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar películas..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar
