import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const stateRef = useRef(location.state);

  useEffect(() => {
    const fetchedMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODMzM2Y2ZTcwZWMwNWIwN2U0YzNmZmNhYTU3YjQxZiIsIm5iZiI6MTc0NTM5NjkxNC4zMTgsInN1YiI6IjY4MDhhNGIyMjc2YmY2NGU0MWFiNTI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zqBRL3WS-ks21ACPtLO09_rJzvqATu4q8wxirKcw8Fk',
        },
      };
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        setError('Failed to load movie details. Please try again later.');
      }
    };
    fetchedMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(stateRef.current ? stateRef.current : '/movies');
  };

  return (
    <>
      {!movie ? (
        <p>Loading...</p>
      ) : (
        <>
          <button type="button" onClick={handleGoBack} className={css.button}>
            ⬅ Go back
          </button>
          <div className={css.infoContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
            />
            <div>
              <div className={css.info}>
                <h1>{movie.title}</h1>
                <p>User Score: {Math.round(movie.vote_average * 10)}% </p>
              </div>
              <div className={css.info}>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
              </div>
              <div className={css.info}>
                <h2>Genres</h2>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              <div className={css.info}>
                <h2>Additional information</h2>
                <ul className={css.infoList}>
                  <li>
                    <Link
                      to="cast"
                      state={{ from: location.pathname }}
                      className={css.linkInfo}
                    >
                      Cast
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="reviews"
                      state={{ from: location.pathname }}
                      className={css.linkInfo}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
}
