import MediaSection from "../../components/MediaSection";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import styles from "./movies.module.scss";

const Movies: React.FC = () => {
	const {
		state: { week_trending, top_rated_movies, upcoming_movies, week_trending_page, top_rated_page, top_upcoming_page, movies_playing_now_page, movies_playing_now },
	} = useGeneralContext();

	return (
		<section className={styles.movies}>
			<Navigation />
			<div className={styles.wrapper}>
				<MediaSection
					action={ActionTypes.FETCH_TOP_RATED_MOVIES}
					path={`/movies/top-rated/${top_rated_page}`}
					section_title="Top rated movies"
					data={top_rated_movies}
					page={top_rated_page}
				/>
				<MediaSection
					action={ActionTypes.FETCH_TOP_UPCOMING}
					path={`/movies/upcoming/${top_upcoming_page}`}
					section_title="Upcoming movies"
					data={upcoming_movies}
					page={top_upcoming_page}
				/>
				<MediaSection
					action={ActionTypes.FETCH_MOVIES_PLAYING_NOW}
					path={`/movies/playing-now/${movies_playing_now_page}`}
					section_title="New movies in theaters right now"
					data={movies_playing_now}
					page={movies_playing_now_page}
				/>
			</div>
		</section>
	);
};
export default Movies;
