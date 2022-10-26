import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import Recommended from "./components/Recommended";
import Trending from "./components/Trending";
import styles from "./home.module.scss";

const Home: React.FC = () => {
	console.log("loading");
	return (
		<section className={styles.home}>
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies or TV series" path={"home"} />
				<Trending />
				<Recommended />
			</div>
		</section>
	);
};

export default Home;
