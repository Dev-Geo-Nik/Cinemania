// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";
import "./assets/css/index.scss";
import Media from "./pages/dynamic/media/Media";
import Bookmarked from "./pages/Bookmarked";
import { useEffect } from "react";
import { data } from "./data/data";
import { ActionTypes } from "./context/Actions";
import { useGeneralContext } from "./context/GeneralContext";

const App: React.FC = () => {
	const { dispatch } = useGeneralContext();
	useEffect(() => {
		const movies: any = [];
		const series: any = [];
		const bookmarkedMovies: any = [];
		const bookmarkedSeries: any = [];
		const MOVIE = "Movie";
		const TV_SERIES = "TV Series";

		data.map((a: any) => {
			if (a.category === MOVIE) {
				movies.push(a);
				if (a.isBookmarked === true) {
					bookmarkedMovies.push(a);
				}
			}
			if (a.category === TV_SERIES) {
				series.push(a);
				if (a.isBookmarked === true) {
					bookmarkedSeries.push(a);
				}
			}
		});

		dispatch({
			type: ActionTypes.FETCH_INITIAL_DATA,
			payload: { moviesArray: movies, seriesArray: series, allData: data, favMovies: bookmarkedMovies, favSeries: bookmarkedSeries },
		});
	}, []);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/media/:category" element={<Media />} />
					<Route path="/media/bookmarked" element={<Bookmarked />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
