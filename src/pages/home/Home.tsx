import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import Recommended from "./components/Recommended";
import Trending from "./components/Trending";
import styles from "./home.module.scss";
import { data } from "../../data/data";
import { useGeneralContext } from "../../context/GeneralContext";
import { useEffect } from "react";
import { ActionTypes } from "../../context/Actions";

const Home: React.FC = () => {
	const { dispatch } = useGeneralContext();
	const movies: any = [];
	const series: any = [];

	useEffect(() => {
		data.filter((a: any) => {
			if (a.category === "Movie") {
				movies.push(a);
			} else {
				series.push(a);
			}
		});

		dispatch({ type: ActionTypes.FETCH_INITIAL_DATA, payload: { moviesArray: movies, seriesArray: series, allData: data } });
	}, []);

	return (
		<section className={styles.home}>
			<Navigation />
			<div className={styles.wrapper}>
				<SearchBar label="Search for movies or TV series" />
				<Trending />
				<Recommended />
			</div>
		</section>
	);
};

export default Home;
