import axios from "axios";
import { useEffect } from "react";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import SingleCard from "../../components/SingleCard";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import styles from "./bookmarked.module.scss";

const Bookmarked: React.FC = () => {
	const {
		state: { favMovies, favSeries, bookmarkedFilter, user, bookmarks },
		dispatch,
	} = useGeneralContext();

	let displayBookmarkedMovies;
	let displayBookmarkedPersonalities;

	useEffect(() => {
		if (user) {
			const axios_obj = axios.create();
			axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
			axios_obj.defaults.headers.common["Accept"] = "application/json";
			axios_obj
				.post("http://localhost:8000/api/bookmarks", {
					user_id: user.user_id,
				})
				.then((res) => {
					console.log(res.data.data);

					dispatch({ type: ActionTypes.FETCH_BOOKMARKS, payload: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const objectLength = Object.keys(bookmarks).length;
	if (objectLength > 0) {
		const { persons, movies } = bookmarks;

		displayBookmarkedMovies = movies.map((movie: any) => {});
	}

	return (
		<section className={styles.Bookmarked}>
			<Navigation />
			<div className={styles.container}>
				<SearchBar label="Search for bookmarked shows" path={"bookmarked"} />
				<h2 className={styles.section_title}>Bookmarked Movies</h2>
				<div className={styles.wrapper}>{displayBookmarkedMovies}</div>
				<h2 className={styles.section_title}>Bookmarked Personalities</h2>
				<div className={styles.wrapper}>{displayBookmarkedPersonalities}</div>
			</div>
		</section>
	);
};

export default Bookmarked;
