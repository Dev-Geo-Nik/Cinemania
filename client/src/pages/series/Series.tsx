import MediaSection from "../../components/MediaSection";
import Navigation from "../../components/Navigation";
import { useGeneralContext } from "../../context/GeneralContext";
import styles from "./series.module.scss";

const Series: React.FC = () => {
	const {
		state: {},
	} = useGeneralContext();

	return (
		<section className={styles.series}>
			<Navigation />
			{/* <div className={styles.wrapper}>
				<MediaSection
					action={ActionTypes.FETCH_TOP_RATED_MOVIES}
					path={`/movies/top-rated/${top_rated_page}`}
					section_title="Top rated movies"
					data={top_rated_movies}
					page={top_rated_page}
				/>
			</div> */}
		</section>
	);
};

export default Series;
