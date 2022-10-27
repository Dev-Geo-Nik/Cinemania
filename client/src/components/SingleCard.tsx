import Bookmark from "./Bookmark";
import styles from "./singleCard.module.scss";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rating from "./Rating";

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
	const rating = +vote_average.toFixed(1) * 10;
	return (
		<div key={id} className={styles.single_container}>
			<Bookmark isBookmarked={false} />
			<div className={styles.rating_wrapper}>
				<Rating rating={rating} />
			</div>
			<div className={styles.image_wrapper}>
				<LazyLoadImage alt={""} effect="blur" src={`https://image.tmdb.org/t/p/original/${poster_path}`} className={styles.trending_image} />
			</div>
			<div className={styles.detail_container}>
				<p className={styles.year}>{release_date ? release_date : first_air_date}</p>
				<li className={styles.list_item}></li>
				<span className={styles.span_flex}>
					{media_type === "movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
					<span className={styles.movie_text}>{media_type}</span>
				</span>
			</div>
			<p className={styles.movie_title}>{name ? name : title}</p>
		</div>
	);
};

export default SingleCard;
