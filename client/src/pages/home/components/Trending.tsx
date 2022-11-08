// libraries
import { MdLocalMovies, MdLiveTv, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//Local
import styles from "./trending.module.scss";
import Bookmark from "../../../components/Bookmark";
import { useGeneralContext } from "../../../context/GeneralContext";
import Rating from "../../../components/Rating";
import { useEffect, useState } from "react";
import { ActionTypes } from "../../../context/Actions";
import SingleCard from "../../../components/SingleCard";
import UserModal from "../../../components/UserModal";

export interface Root {
	page: number;
	results: Show[];
	total_pages: number;
	total_results: number;
}

export interface Show {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title?: string;
	original_language: string;
	original_title?: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	release_date?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	name?: string;
	original_name?: string;
	first_air_date?: string;
	origin_country?: string[];
}

const Trending: React.FC = () => {
	const {
		state: { homeFilter, BACKEND_URL, movies_genres, trending_movies_series, display_user_modal },
		dispatch,
	} = useGeneralContext();
	const [error, serError] = useState(false);

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/trending`);
				if (res.status >= 200 && res.status < 300) {
					const response_data = await res.json();

					if (response_data.status_message) {
						serError(true);
						return;
					}
					dispatch({ type: ActionTypes.FETCH_TRENDING_DATA, payload: response_data.results });
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	let displayTrendingMovies;
	if (trending_movies_series.length > 0) {
		displayTrendingMovies = trending_movies_series.map((movie: any) => {
			let id = movie.id;
			return <SingleCard media={movie} key={id} />;
		});
	}

	return (
		<section className={styles.trending}>
			<h2 className={styles.section_title}>Daily trending movies </h2>
			<div className={styles.movies_container}>{displayTrendingMovies}</div>
		</section>
	);
};

export default Trending;
