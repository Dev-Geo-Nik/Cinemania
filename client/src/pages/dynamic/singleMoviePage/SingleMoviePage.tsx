import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from "react-router-dom";
import Bookmark from "../../../components/Bookmark";
import Navigation from "../../../components/Navigation";
import Rating from "../../../components/Rating";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import styles from "./singleMoviePage.module.scss";

export interface MovieProps {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

const SingleMoviePage: React.FC = () => {
	const { pathname } = useLocation();
	const {
		state: { BACKEND_URL, single_movie },
		dispatch,
	} = useGeneralContext();

	const movie_id = pathname.split("/")[3];

	useEffect(() => {
		// todo make a single reusable function that  error or data not hook so i can use it inside of the top level useEffect
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/movie/${movie_id}`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						dispatch({ type: ActionTypes.FETCH_SINGLE_MOVIE, payload: responseData });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	let header;
	if (single_movie) {
		const { backdrop_path, title, poster_path, tagline, overview, popularity, release_date, genres, vote_average, runtime } = single_movie as MovieProps;

		const rating = +vote_average.toFixed(0) * 10;
		const duration = +runtime / 60;
		const x = duration.toFixed(2).toString();
		const displayGenres = genres.map((genre: any) => {
			return (
				<span className={styles.genre_tag} key={genre.id}>
					{genre.name}
				</span>
			);
		});
		header = (
			<div className={styles.header}>
				<Bookmark />
				<img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} className={styles.background_image} alt={title} />
				<div className={styles.content}>
					<div className={styles.image_wrapper}>
						<div className={styles.rating_wrapper}>
							<Rating rating={rating} />
						</div>
						<LazyLoadImage alt={title} effect="blur" src={`https://image.tmdb.org/t/p/original/${poster_path}`} className={styles.poster_image} />
					</div>
					<div className={styles.text_container}>
						<h2 className={styles.movie_title}>{title}</h2>
						<p className={styles.tagline}>{tagline}</p>
						<h3 className={styles.overview_title}>Overview</h3>
						<p className={styles.overview_text}>{overview}</p>
						<p className={styles.release_date}>
							Release date: <span>{release_date}</span>
						</p>
						<p className={styles.genres}>
							Genres: <span>{displayGenres}</span>
						</p>
						<p className={styles.movie_time}>
							Duration : <span>{`${x[0]}h : ${x[2]}${x[3]}m`}</span>
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<section className={styles.single_movie_container}>
			<Navigation />
			<div className={styles.wrapper}>{header}</div>
		</section>
	);
};

export default SingleMoviePage;
