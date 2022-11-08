import MediaSection from "../../components/MediaSection";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import UserModal from "../../components/UserModal";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import Trending from "./components/Trending";
import TrendingPeople from "./components/TrendingPeople";
import styles from "./home.module.scss";

const Home: React.FC = () => {
	const {
		state: { week_trending, week_trending_page, display_user_modal, user },
	} = useGeneralContext();

	console.log(user);
	return (
		<section className={styles.home}>
			{display_user_modal && <UserModal />}
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies or TV series" path={"home"} />
				<Trending />
				{/* <Recommended /> */}
				<MediaSection
					action={ActionTypes.FETCH_WEEK_TRENDING}
					path={`/movies/week-trending/${week_trending_page}`}
					section_title="Weekly trending movies"
					data={week_trending}
					page={week_trending_page}
				/>
				<TrendingPeople />
			</div>
		</section>
	);
};

export default Home;
