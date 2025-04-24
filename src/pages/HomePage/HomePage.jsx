import axios from 'axios';
import { useState, useEffect } from 'react';
import css from './HomePage.module.css';

import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    trendingMovies();
  }, []);

  const trendingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day';

    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODMzM2Y2ZTcwZWMwNWIwN2U0YzNmZmNhYTU3YjQxZiIsIm5iZiI6MTc0NTM5NjkxNC4zMTgsInN1YiI6IjY4MDhhNGIyMjc2YmY2NGU0MWFiNTI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zqBRL3WS-ks21ACPtLO09_rJzvqATu4q8wxirKcw8Fk',
      },
    };
    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (error) {
      setError('Failed to load trending movies. Please try again later.');
    }
  };

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </>
  );
}
