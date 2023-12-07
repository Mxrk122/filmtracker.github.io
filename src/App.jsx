import { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar';
import Movie from './Components/Movie';
import { useDataMovies } from './hooks/useDataMovies'
import { useFilter  } from './hooks/useFilter';
import './styles/App.css'



function App() {

  const { filter, updateFilter } = useFilter('default');
  const dataurl = "https://www.omdbapi.com/?apikey=6098a450&s=default"
  // 6098a450

  useEffect(() => {
      const getDataMovies = async () => {
        const response = await fetch(dataurl)
        const data = await response.json()
        updateDataMovies(data.Search)
        // console.log(data.Search)
      }
      getDataMovies()
  },[])

  const getMovieImg = async (id) => {
    const imageUrl = `https://img.omdbapi.com/?i=${id}&apikey=6098a450`;
    //console.log(imageUrl)
    try {
      const response = await fetch(imageUrl);
  
      // Obtuve una respuesta
      if (response.ok) {
        const data = await response.blob();
        const objectUrl = URL.createObjectURL(data);
        // console.log('Imagen obtenida:', objectUrl);
        // DEvolver el bloburl
        return objectUrl;
      } else {
        // Error al obtener laa imagen -> no existe 
        return 'https://img3.stockfresh.com/files/b/blotty/m/28/489019_stock-photo-film-slate-with-movie-film-reel.jpg';
      }
    } catch (error) {
      // No obtuve algo
      return 'error';
    }
  };

  const { dataMovies, updateDataMovies } = useDataMovies(filter, getMovieImg)

  const handleSearch = () => {
    // Llama a la función de búsqueda pasando la consulta
    const getMovieDetails = async () => {
      const movieDetailsUrl = `https://www.omdbapi.com/?apikey=6098a450&t=${filter}`;
      const response = await fetch(movieDetailsUrl);
      const data = await response.json();

      console.log(data)
      if (data.Response !== 'False') {
        // Obtener la URL de la imagen
        const imageUrl = await getMovieImg(data.imdbID);
    
        // agregar Url de la imagen
        const movieDetails = {
          ...data,
          imageUrl: imageUrl,
        };
    
        updateDataMovies([movieDetails])
      } else {
        // si no se devuelven resultados renderizar codigo de error
        console.log('La búsqueda no devolvió resultados');
        updateDataMovies(null)
      }
    };

    getMovieDetails()
    console.log(filter)
  };

  //

  return (
    <div className='main'>
      <h1>FilmTracker</h1>
      {dataMovies ? null : <strong>No encontramos peliculas que coincidan con la busqueda :(</strong>}
      <SearchBar setFilter={updateFilter} handleSearch={handleSearch} />
      <div className="results-container">
          {dataMovies ? (
            dataMovies.map((item) => (
              <Movie 
              key={item.imdbID}
              title={item.Title}
              desc={item.Year}
              image={item.imageUrl}
              />
            ))) :
            (
              null
            )
          }
      </div>
    </div>
  )
}

export default App
