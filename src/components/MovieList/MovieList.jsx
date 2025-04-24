import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location.pathname }}
            className={css.movieTitle}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
