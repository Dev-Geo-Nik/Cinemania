import { useEffect } from "react";
import { Link } from "react-router-dom";
import SingleCard from "../../../../components/SingleCard";
import { ActionTypes } from "../../../../context/Actions";
import { useGeneralContext } from "../../../../context/GeneralContext";
import { useFetch } from "../../../../hooks/useFetch";
import { SimilarMovie, SimilarMoviesData } from "../../../../utils/types";
import styles from "./similarMovies.module.scss";

const SimilarMovies: React.FC = () => {
	const {
		state: { BACKEND_URL, single_movie, single_recommended_movies },
		dispatch,
	} = useGeneralContext();

	// const url = `${BACKEND_URL}/movies/movie/similar-movies/${single_movie?.id}`;
	// const { data, error } = useFetch(url, {}, url);

	// useEffect(() => {
	// 	dispatch({ type: ActionTypes.FETCH_SINGLE_RECOMMENDED_MOVIES, payload: data });
	// }, [data]);

	const handlerClick = (id: number) => {
		dispatch({ type: ActionTypes.UPDATE_SINGLE_MOVIE_ID, payload: id });
	};

	let displaySimilarMovies;
	if (single_recommended_movies) {
		const movies: SimilarMoviesData = single_recommended_movies;
		displaySimilarMovies = movies.results.map((movie: any) => {
			let id = movie.id;
			return (
				<div className={styles.link} onClick={() => handlerClick(id)} key={id}>
					<SingleCard media={movie} />;
				</div>
			);
		});
	}

	return (
		<div className={styles.similar_movies}>
			<h2 className={styles.section_title}>Similar movies</h2>
			<div className={styles.wrapper}>{displaySimilarMovies}</div>
		</div>
	);
};

export default SimilarMovies;
