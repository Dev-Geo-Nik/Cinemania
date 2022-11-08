// libraries

// local
import { useEffect } from "react";
import { data } from "./data/data";
import { ActionTypes } from "./context/Actions";
import { useGeneralContext } from "./context/GeneralContext";
import Router from "./Router";

const App: React.FC = () => {
	const {
		dispatch,
		state: { BACKEND_URL, display_user_modal },
	} = useGeneralContext();
	useEffect(() => {
		const genres: any = [];
		// const movies: any = [];
		// const series: any = [];
		// const bookmarkedMovies: any = [];
		// const bookmarkedSeries: any = [];

		// const MOVIE = "Movie";
		// const TV_SERIES = "TV Series";

		// // Todo  save the states to the local storage and create bookmark system.
		// data.map((a: any) => {
		// 	if (a.category === MOVIE) {
		// 		movies.push(a);
		// 		if (a.isBookmarked === true) {
		// 			bookmarkedMovies.push(a);
		// 		}
		// 	}
		// 	if (a.category === TV_SERIES) {
		// 		series.push(a);
		// 		if (a.isBookmarked === true) {
		// 			bookmarkedSeries.push(a);
		// 		}
		// 	}
		// });

		// dispatch({
		// 	type: ActionTypes.FETCH_INITIAL_DATA,
		// 	payload: { moviesArray: movies, seriesArray: series, allData: data, favMovies: bookmarkedMovies, favSeries: bookmarkedSeries },
		// });

		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/genres`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						dispatch({ type: ActionTypes.FETCH_ALL_MOVIES_GENRES, payload: responseData.genres });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	return (
		<>
			<Router />
		</>
	);
};

export default App;
