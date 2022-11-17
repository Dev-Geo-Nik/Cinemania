import axios from "axios";
import { useEffect } from "react";
import MediaSection from "../../components/MediaSection";
import Navigation from "../../components/Navigation";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import Category_filters from "./components/Category_filters";
import styles from "./movies_filter.module.scss";

const Movies_filter: React.FC = () => {
	const {
		state: { user, genre, genre_id, current_movies_by_genre, current_genre_movie_page },
		dispatch,
	} = useGeneralContext();

	return (
		<section className={styles.movies_filter}>
			<Navigation />
			<div className={styles.wrapper}>
				<Category_filters />
				<MediaSection
					action={ActionTypes.FETCH_CURRENT_MOVIES_BY_GENRE}
					path={`/movies/filter/category/${genre_id}/${current_genre_movie_page}/`}
					section_title="Discover movies by category"
					data={current_movies_by_genre}
					page={current_genre_movie_page}
					filter_category={genre_id}
				/>
			</div>
		</section>
	);
};

export default Movies_filter;
