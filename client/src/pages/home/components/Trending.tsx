// libraries
import { MdLocalMovies, MdLiveTv } from "react-icons/md";

//Local
import styles from "./trending.module.scss";
import Bookmark from "../../../components/Bookmark";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useFetch } from "../../../hooks/useFetch";
import Rating from "../../../components/Rating";
import { useEffect, useState } from "react";

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
		state: { allData, homeFilter, BACKEND_URL },
	} = useGeneralContext();

	const [trendingArray, setTrendingArray] = useState<any>([]);
	const [arrayStart, setArrayStart] = useState(0);
	const [arrayMaxLength, setArrayMaxLength] = useState(0);
	const [arrayCurrentMax, setArrayCurrentMax] = useState(4);
	// const { data, error } = useFetch(`${BACKEND_URL}movies/trending`);

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}movies/trending`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();

					if (responseData) {
						setArrayMaxLength(responseData.length);
						setTrendingArray(buildCard(responseData));
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	const buildCard = (data: Root) => {
		let displayTrendingShows = data.results.map((show: Show, index: number) => {
			const { title, id, genre_ids, media_type, overview, popularity, vote_average, name, release_date, poster_path, first_air_date } = show;
			const rating = +vote_average.toFixed(1) * 10;
			return (
				<div key={id} className={styles.single_container}>
					<Bookmark isBookmarked={false} />
					<div className={styles.rating_wrapper}>
						<Rating rating={rating} />
					</div>
					<img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} className={styles.trending_image} />
					<div className={styles.movie_detail_container}>
						<p className={styles.year}>{release_date ? release_date : first_air_date}</p>
						<li className={styles.list_item}></li>
						<span className={styles.span_flex}>
							{media_type === "movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
							<span className={styles.movie_text}>{media_type}</span>
						</span>
						{/* <li className={styles.list_item}>{vote_average}</li> */}
					</div>
					<p className={styles.movie_title}>{name ? name : title}</p>
				</div>
			);
		});

		return displayTrendingShows;
	};

	// if (data) {
	// 	const trendingShows: Root = data;

	// 	displayTrendingShows = trendingShows.results.map((show: Show, index: number) => {
	// 		const { title, id, genre_ids, media_type, overview, popularity, vote_average, name, release_date, poster_path, first_air_date } = show;
	// 		console.log(vote_average.toFixed(1));
	// 		const rating = +vote_average.toFixed(1) * 10;
	// 		return (
	// 			<div key={id} className={styles.single_container}>
	// 				<Bookmark isBookmarked={false} />
	// 				<div className={styles.rating_wrapper}>
	// 					<Rating rating={rating} />
	// 				</div>
	// 				<img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} className={styles.trending_image} />
	// 				<div className={styles.movie_detail_container}>
	// 					<p className={styles.year}>{release_date ? release_date : first_air_date}</p>
	// 					<li className={styles.list_item}></li>
	// 					<span className={styles.span_flex}>
	// 						{media_type === "movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
	// 						<span className={styles.movie_text}>{media_type}</span>
	// 					</span>
	// 					{/* <li className={styles.list_item}>{vote_average}</li> */}
	// 				</div>
	// 				<p className={styles.movie_title}>{name ? name : title}</p>
	// 			</div>
	// 		);
	// 	});
	// }

	// let displayTrendingMovies = allData.map((movie: any, index: any) => {
	// 	const {
	// 		title,
	// 		thumbnail: { regular },
	// 		category,
	// 		rating,
	// 		year,
	// 		isBookmarked,
	// 	} = movie;

	// 	return (
	// 		<div key={`${movie}${index}`} className={styles.single_container}>
	// 			<Bookmark isBookmarked={isBookmarked} />
	// 			<img src={require(`../../../${regular.large}`)} alt="" className={styles.trending_image} />
	// 			<div className={styles.movie_detail_container}>
	// 				<p className={styles.year}>{year}</p>
	// 				<li className={styles.list_item}></li>
	// 				<span className={styles.span_flex}>
	// 					{category === "Movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
	// 					<span className={styles.movie_text}>{category}</span>
	// 				</span>
	// 				<li className={styles.list_item}>{rating}</li>
	// 			</div>
	// 			<p className={styles.movie_title}>{title}</p>
	// 		</div>
	// 	);
	// });

	let filteredArray;
	if (trendingArray.length > 0) {
		filteredArray = trendingArray.map((obj: any, index: number) => {
			if (index > arrayCurrentMax) {
				return null;
			}
		});
	}

	return (
		<>
			{!homeFilter ? (
				<section className={styles.trending}>
					<h2 className={styles.section_title}>Trending</h2>
					<div className={styles.movies_container}>{filteredArray}</div>
				</section>
			) : null}
		</>
	);
};

export default Trending;
