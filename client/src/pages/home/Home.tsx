import MediaSection from "../../components/MediaSection";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import Recommended from "./components/Recommended";
import Trending from "./components/Trending";
import TrendingPeople from "./components/TrendingPeople";
import styles from "./home.module.scss";

const Home: React.FC = () => {
	const {
		state: { week_trending, week_trending_page },
	} = useGeneralContext();
	return (
		<section className={styles.home}>
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies or TV series" path={"home"} />
				<Trending />
				{/* <Recommended /> */}
				<MediaSection
					action={ActionTypes.FETCH_WEEK_TRENDING}
					path={`/movies/week-trending/${week_trending_page}`}
					section_title="Weekly trending movies or TV series"
					data={week_trending}
					page={week_trending_page}
				/>
				<TrendingPeople />
			</div>
		</section>
	);
};

export default Home;
