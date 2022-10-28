import MediaSection from "../../../components/MediaSection";
import Navigation from "../../../components/Navigation";
import SearchBar from "../../../components/SearchBar";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import styles from "./movies.module.scss";

const Movies: React.FC = () => {
	const {
		state: { week_trending, top_rated_movies, upcoming_movies },
	} = useGeneralContext();

	return (
		<section className={styles.movies}>
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies" path={"home"} />
				<MediaSection action={ActionTypes.FETCH_WEEK_TRENDING} path="/movies/week-trending" section_title="Weekly trending movies or TV series" data={week_trending} />
				<MediaSection action={ActionTypes.FETCH_TOP_RATED_MOVIES} path="/movies/top-rated/3" section_title="Top rated movies" data={top_rated_movies} />
				<MediaSection action={ActionTypes.FETCH_TOP_UPCOMING} path="/movies/upcoming/1" section_title="Upcoming movies" data={upcoming_movies} />
			</div>
		</section>
	);
};
export default Movies;
