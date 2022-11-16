import axios from "axios";
import { useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useGeneralContext } from "../../context/GeneralContext";
import styles from "./movies_filter.module.scss";

const Movies_filter: React.FC = () => {
	const {
		state: { user },
	} = useGeneralContext();

	useEffect(() => {
		const axios_obj = axios.create();
		// axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
		// axios_obj.defaults.headers.common["Accept"] = "application/json";
		axios_obj
			.get("http://localhost:8000/api/movies/genre")
			.then((res) => {
				console.log(res);
				// dispatch({ type: ActionTypes.FETCH_BOOKMARKS, payload: res.data.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section className={styles.movies_filter}>
			<Navigation />
			<div className={styles.wrapper}>{/* <SearchBar label="Search for movies or TV series" path={"home"} /> */}</div>
		</section>
	);
};

export default Movies_filter;
