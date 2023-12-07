import { useState, useEffect } from 'react';

export const useDataMovies = (filter, getMovieImg) => {
    const [dataMovies, setDataMovies] = useState([]);
    
      // Busqueda automatica
      useEffect(() => {
        const getDataMoviesByFilter = async () => {
          // console.log('realizando busqueda')
          const filterurl = `https://www.omdbapi.com/?apikey=6098a450&s=${filter}`
          const response = await fetch(filterurl)
          const data = await response.json()
          //console.log(filter)
          const r = data.Response
          //console.log(data)
          if (r !== 'False') {
            // console.log('Resultado de la búsqueda:', data.Search);
            // obtener todas las url de las imagenes
            const promisesArray = data.Search.map(async (item) => {
              return getMovieImg(item.imdbID);
            });
    
            const resolvedUrls = await Promise.all(promisesArray);
    
            // asignar url de imagenes al array obtenido por la Api
            const moviesCompleteInfo = data.Search.map((item, index) => ({
              ...item, // Copia todas las propiedades existentes del objeto JSON original
              imageUrl: resolvedUrls[index], // Agrega la nueva propiedad "imageUrl" con la URL resuelta
            }));
    
            // ahora tenemos el array con las imagenes incluidas
            setDataMovies(moviesCompleteInfo)
          } else {
            
            //console.log('La búsqueda no devolvió resultados');
          }
        }
        // Agregar retraso para debounce
          const timeoutId = setTimeout(() => {
            getDataMoviesByFilter();
          }, 500);
    
          return () => clearTimeout(timeoutId);
      } ,[filter])

      const updateDataMovies = (arr) => {
        setDataMovies(arr)
      }

  return { dataMovies, updateDataMovies };
};


