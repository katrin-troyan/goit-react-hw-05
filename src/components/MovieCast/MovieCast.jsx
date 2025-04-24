import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchedMovieCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODMzM2Y2ZTcwZWMwNWIwN2U0YzNmZmNhYTU3YjQxZiIsIm5iZiI6MTc0NTM5NjkxNC4zMTgsInN1YiI6IjY4MDhhNGIyMjc2YmY2NGU0MWFiNTI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zqBRL3WS-ks21ACPtLO09_rJzvqATu4q8wxirKcw8Fk',
        },
      };
      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (error) {
        setError('Failed to load movie details. Please try again later.');
      }
    };
    fetchedMovieCast();
  }, [movieId]);

  return (
    <>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </>
  );
}
