// Libraries

import { Link, useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Local
import { useEffect, useState } from "react";
import Bookmark from "../../../components/Bookmark";
import ButtonRegister from "../../../components/ButtonRegister";
import Navigation from "../../../components/Navigation";
import Rating from "../../../components/Rating";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import Cast from "./components/Cast";
import styles from "./singleMoviePage.module.scss";
import { MovieProps } from "../../../utils/types";
import Trailer from "./components/Trailer";
import SimilarMovies from "./components/SimilarMovies";

const SingleMoviePage: React.FC = () => {
	const { pathname } = useLocation();
	const {
		state: { BACKEND_URL, single_movie, single_movie_id },
		dispatch,
	} = useGeneralContext();
	const movie_id = pathname.split("/")[3];
	const [error, setError] = useState(false);

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/movie/${movie_id}`);
				if (res.status >= 200 && res.status < 300) {
					const response_data = await res.json();
					if (response_data.status_message) {
						setError(true);
						return;
					}

					if (response_data) {
						const cast_data_req = await fetch(`${BACKEND_URL}/movies/movie/cast/${response_data?.id}`);
						const similar_movies_req = await fetch(`${BACKEND_URL}/movies/movie/similar-movies/${response_data?.id}`);

						if (cast_data_req.status >= 200 && cast_data_req.status < 300 && similar_movies_req.status >= 200 && similar_movies_req.status < 300) {
							const cast_data = await cast_data_req.json();
							const similar_movies = await similar_movies_req.json();
							if (similar_movies.status_message || cast_data.status_message) {
								setError(true);
								return;
							}
							dispatch({ type: ActionTypes.FETCH_SINGLE_MOVIE, payload: { single_movie: response_data, similar_movies_data: similar_movies, cast: cast_data } });
						}
					}
				}
			} catch (err: any) {
				setError(true);
				return;
			}
		};
		asyncFetch();
	}, [single_movie_id]);

	let header;
	if (single_movie) {
		const { id, backdrop_path, title, poster_path, tagline, overview, release_date, genres, vote_average, runtime, budget, revenue, homepage, original_language } =
			single_movie as MovieProps;
		const rating = vote_average ? +vote_average.toFixed(0) * 10 : 10;
		const duration = +runtime / 60;
		const time = duration.toFixed(2).toString();

		const displayGenres = genres
			? genres.map((genre: any) => {
					return (
						<span className={styles.genre_tag} key={genre.id}>
							{genre.name}
						</span>
					);
			  })
			: null;
		header = (
			<>
				<div className={styles.header}>
					<div className={styles.bookmark_wrapper}>
						<Bookmark />
					</div>
					<img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} className={styles.background_image} alt={title} />
					<div className={styles.content}>
						<div className={styles.image_wrapper}>
							<div className={styles.rating_wrapper}>
								<Rating rating={rating} />
							</div>
							<LazyLoadImage alt={title} effect="blur" src={`https://image.tmdb.org/t/p/original/${poster_path}`} className={styles.poster_image} />
						</div>
						<div className={styles.text_container}>
							<h2 className={styles.movie_title}>{title && title}</h2>
							<p className={styles.tagline}>{tagline && tagline}</p>
							<h3 className={styles.overview_title}>Overview</h3>
							<p className={styles.overview_text}>{overview && overview}</p>
							<p className={styles.release_date}>
								Release date: <span>{release_date && release_date}</span>
							</p>
							<p className={styles.genres}>
								Genres: <span>{displayGenres}</span>
							</p>
							<p className={styles.movie_time}>
								Duration : <span>{time && `${time[0]}h : ${time[2]}${time[3]}m`}</span>
							</p>
							<p className={styles.budget}>
								Budget : <span>{budget.toLocaleString() === "0" ? "Unknown" : budget.toLocaleString()}</span>
							</p>
							<p className={styles.revenue}>
								Revenue : <span>{revenue.toLocaleString() === "0" ? "Unknown" : revenue.toLocaleString()}</span>
							</p>
							<p className={styles.language}>
								Original language : <span>{original_language && original_language}</span>
							</p>

							<a className={styles.website} href={homepage} target="_blank">
								Website : <span>{homepage ? homepage : "Unknown"}</span>
							</a>
						</div>
					</div>
				</div>
				<Cast />
				<Trailer />
				<SimilarMovies />
			</>
		);
	}

	let errorModal = (
		<div className={styles.error_message_container}>
			<p className={styles.error_message}>The resource you requested could not be found</p>
			<Link to="/">
				<ButtonRegister text="Home" />
			</Link>
		</div>
	);

	return (
		<section className={styles.single_movie_container}>
			<Navigation />
			<div className={styles.wrapper}>{error ? <>{errorModal}</> : <>{header}</>}</div>
		</section>
	);
};

export default SingleMoviePage;
