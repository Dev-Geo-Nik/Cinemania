import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import styles from "./category_filters.module.scss";

const Category_filters: React.FC = () => {
	const {
		state: { current_movies_by_genre, current_genre_movie_page, genre, movies_genres },
		dispatch,
	} = useGeneralContext();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.currentTarget.value);

		dispatch({ type: ActionTypes.UPDATE_CURRENT_GENRE_ID, payload: e.currentTarget.value });

		// if (e.currentTarget.value === "Filter by Region") {
		// 	dispatch({ type: ActionTypes.CURRENT_FILTERED_COUNTRIES, payload: allCountries });
		// } else {
		// 	// console.log("filter");
		// 	const payloadArray = allCountries.filter((country: any) => {
		// 		if (country.region === e.currentTarget.value) {
		// 			return country;
		// 		}
		// 	});
		// 	dispatch({ type: ActionTypes.CURRENT_FILTERED_COUNTRIES, payload: payloadArray });
		// }
	};
	// console.log(movies_genres);
	let displayOptions = movies_genres.map((g: any) => {
		if (g.name === "Action") {
			return (
				<option defaultValue={g.id} value={g.id} key={g.id}>
					{g.name}
				</option>
			);
		} else {
			return (
				<option value={g.id} key={g.id}>
					{g.name}
				</option>
			);
		}
	});

	return (
		<>
			<select onChange={handleChange} className={styles.category_filters}>
				{displayOptions}
			</select>
		</>
	);
};

export default Category_filters;
