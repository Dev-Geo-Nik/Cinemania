// Local
import styles from "./trendingPeople.module.scss";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useEffect } from "react";
import { ActionTypes } from "../../../context/Actions";
import Bookmark from "../../../components/Bookmark";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import UserModal from "../../../components/UserModal";

// export interface Root {
// 	page: number;
// 	results: Person[];
// 	total_pages: number;
// 	total_results: number;
// }

export interface Person {
	adult: boolean;
	id: number;
	name: string;
	original_name: string;
	media_type: string;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path?: string;
	known_for: KnownFor[];
}

export interface KnownFor {
	adult: boolean;
	backdrop_path?: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
const TrendingPeople: React.FC = () => {
	const {
		state: { BACKEND_URL, trending_people, actors_page, display_user_modal },
		dispatch,
	} = useGeneralContext();

	let displayRecommendedMovies;

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/trending-daily-persons/${actors_page}`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						dispatch({ type: ActionTypes.FETCH_TRENDING_PEOPLE, payload: responseData.results });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, [actors_page]);

	if (trending_people) {
		displayRecommendedMovies = trending_people.map((actor: Person, index: any) => {
			const { id, name, profile_path, known_for_department } = actor;
			const imagePath = `https://image.tmdb.org/t/p/original/${profile_path}`;

			if (known_for_department !== "Acting") {
				return null;
			}
			return (
				<span className={styles.single_container} key={id}>
					<div className={styles.bookmark_wrapper}>
						<Bookmark isBookmarked={false} />
					</div>
					<Link to={`/person/${id}`} key={id} className={styles.link}>
						<div className={styles.trending_person_image_container}>
							<LazyLoadImage alt={""} effect="blur" src={imagePath} className={styles.trending_person_image} />
						</div>
						<p className={styles.person_title}>{name}</p>
						<p className={styles.person_profession}>{known_for_department}</p>
					</Link>
				</span>
			);
		});
	}

	return (
		<section className={styles.trending_people}>
			{display_user_modal && <UserModal />}
			<h2 className={styles.section_title}>Daily trending actors </h2>
			<div className={styles.trending_wrapper}>{displayRecommendedMovies}</div>
			<div className={styles.pagination_wrapper}>
				<Pagination maxPages={150} action={ActionTypes.FETCH_TRENDING_PEOPLE} />
			</div>
		</section>
	);
};

export default TrendingPeople;
