import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SearchBar from './Components/SearchBar';
import './App.css'



function App() {
  const [dataMovies, setDataMovies] = useState([]);
  const [imgMovies, setimgMovies] = useState([]);

  const [filter, setFilter] = useState('');

  const dataurl = "http://www.omdbapi.com/?apikey=6098a450&s=default"
  // 6098a450

  useEffect(() => {
      const getDataMovies = async () => {
        const response = await fetch(dataurl)
        const data = await response.json()
        setDataMovies(data.Search)
        console.log(data.Search)
      }
      getDataMovies()
  },[])

  const handleSearch = () => {
    // Llama a la función de búsqueda pasando la consulta
    console.log(filter)
  };

  return (
    <>
    <SearchBar filter={filter} setFilter={setFilter} handleSearch={handleSearch} />
      <ul>
        {
          dataMovies.map((item) => (
            <li key={item.id}>
              <strong>{item.Title}</strong>
            </li>
          ))
        }
        {
          imgMovies.map((item) => (
            <li key={item.id}>
              <strong>{item.Title}</strong>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
