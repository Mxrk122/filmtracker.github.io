import { useState, useEffect } from 'react'

function SearchBar(filter, setFilter, handleSearch) {
    
    //onClick={handleSearch}

    //value={query}
    // onChange={(e) => setQuery(e.target.value)}

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar películas..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </>
  )
}

export default SearchBar
