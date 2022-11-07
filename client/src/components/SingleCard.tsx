import Bookmark from "./Bookmark";
import styles from "./singleCard.module.scss";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rating from "./Rating";
import { useGeneralContext } from "../context/GeneralContext";
import { Link } from "react-router-dom";

interface Props {
	media: Result;
}

export interface Root {
	page: number;
	results: Result[];
	total_pages: number;
	total_results: number;
}

export interface Result {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name?: string;
	original_language: string;
	original_name?: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	first_air_date?: string;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
	title?: string;
	original_title?: string;
	release_date?: string;
	video?: boolean;
}

const SingleCard: React.FC<Props> = ({ media }) => {
	const {
		state: { movies_genres },
	} = useGeneralContext();

	const {
		id,
		backdrop_path,
		adult,
		genre_ids,
		media_type,
		original_language,
		overview,
		popularity,
		poster_path,
		vote_average,
		vote_count,
		name,
		title,
		original_title,
		release_date,
		first_air_date,
	} = media;
	// console.log(genre_ids[0]);
	const rating = +vote_average.toFixed(1) * 10;

	let genre;
	if (movies_genres) {
		genre = movies_genres.filter((a: any) => {
			// console.log(a)
			if (a.id === genre_ids[0]) {
				return a.name;
			}
		});
	}

	return (
		<span className={styles.single_container_wrapper} key={id}>
			<div className={styles.bookmark_wrapper}>
				<Bookmark isBookmarked={false} />
			</div>
			<Link to={`/media/movie/${id}`} className={styles.single_container}>
				<div className={styles.rating_wrapper}>
					<Rating rating={rating} />
				</div>
				<div className={styles.image_wrapper}>
					<LazyLoadImage alt={name} effect="blur" src={`https://image.tmdb.org/t/p/original/${poster_path}`} className={styles.trending_image} />
				</div>
				<p className={styles.movie_title}>{name ? name : title}</p>
				<div className={styles.detail_container}>
					<p className={styles.year}>{release_date ? release_date : first_air_date}</p>
					<li className={styles.list_item}></li>
					<span className={styles.span_flex}>
						{media_type === "movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
						<span className={styles.movie_text}>{media_type}</span>
					</span>
				</div>
				<p className={styles.genre}>Genre: {genre[0] ? (genre[0]["name"] ? genre[0]["name"] : "Unknown") : "Unknown"}</p>
			</Link>
		</span>
	);
};

export default SingleCard;
