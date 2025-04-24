import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
import { useState } from 'react';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value.trim();
    if (searchQuery === '') {
      alert('Please enter a search query.');
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;

      const options = {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODMzM2Y2ZTcwZWMwNWIwN2U0YzNmZmNhYTU3YjQxZiIsIm5iZiI6MTc0NTM5NjkxNC4zMTgsInN1YiI6IjY4MDhhNGIyMjc2YmY2NGU0MWFiNTI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zqBRL3WS-ks21ACPtLO09_rJzvqATu4q8wxirKcw8Fk',
        },
      };
      const response = await axios.get(url, options);
      setMovies(response.data.results);
      setError(null);
    } catch (error) {
      setError('Failed to load trending movies. Please try again later.');
    }
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input className={css.input} type="text" name="query" autoFocus />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </>
  );
}
