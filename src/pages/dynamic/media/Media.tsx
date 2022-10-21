import Navigation from "../../../components/Navigation";
import SearchBar from "../../../components/SearchBar";
import Recommended from "../../home/components/Recommended";
import Trending from "../../home/components/Trending";
import styles from "./media.module.scss";

const Media: React.FC = () => {
	return (
		<section className={styles.media}>
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies or TV series" />
				<Recommended />
			</div>
		</section>
	);
};

export default Media;
