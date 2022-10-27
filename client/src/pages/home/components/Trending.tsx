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
		state: { homeFilter, BACKEND_URL },
	} = useGeneralContext();

	const [trendingArray, setTrendingArray] = useState<any>([]);
	const [arrayIndexes, setArrayIndexes] = useState({
		index0: 0,
		index1: 1,
		index2: 2,
		index3: 3,
		index4: 4,
		arrayMaxLength: 0,
	});

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/trending`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();

					if (responseData) {
						setArrayIndexes({
							...arrayIndexes,
							arrayMaxLength: responseData.results.length,
						});
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
					<LazyLoadImage alt={""} effect="blur" src={`https://image.tmdb.org/t/p/original/${poster_path}`} className={styles.trending_image} />
					<div className={styles.movie_detail_container}>
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
		});

		return displayTrendingShows;
	};

	const clickHandler = (direction: string) => {
		const { index0, index1, index2, index3, index4, arrayMaxLength } = arrayIndexes;
		if (direction === "right") {
			if (index4 <= arrayMaxLength - 2) {
				setArrayIndexes({
					...arrayIndexes,
					index0: index0 + 1,
					index1: index1 + 1,
					index2: index2 + 1,
					index3: index3 + 1,
					index4: index4 + 1,
				});
			}
		}

		if (direction === "left") {
			if (index0 <= arrayMaxLength - 2 && index0 > 0) {
				setArrayIndexes({
					...arrayIndexes,
					index0: index0 - 1,
					index1: index1 - 1,
					index2: index2 - 1,
					index3: index3 - 1,
					index4: index4 - 1,
				});
			}
		}
	};

	let display;
	if (trendingArray.length > 0) {
		display = (
			<>
				{trendingArray[arrayIndexes.index0]}
				{trendingArray[arrayIndexes.index1]}
				{trendingArray[arrayIndexes.index3]}
				{trendingArray[arrayIndexes.index4]}
			</>
		);
	}

	return (
		<>
			{!homeFilter ? (
				<section className={styles.trending}>
					<h2 className={styles.section_title}>Daily trending movies or TV series </h2>
					<div className={styles.movies_container}>{display}</div>
					<div className={styles.arrows_wrapper}>
						<MdKeyboardArrowLeft className={`${styles.icon_arrow} ${styles.icon_arrow_left}`} onClick={() => clickHandler("left")} />
						<MdKeyboardArrowRight className={`${styles.icon_arrow} ${styles.icon_arrow_right}`} onClick={() => clickHandler("right")} />
					</div>
				</section>
			) : null}
		</>
	);
};

export default Trending;
