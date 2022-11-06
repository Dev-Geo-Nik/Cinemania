// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";
import "./assets/css/index.scss";
import Bookmarked from "./pages/Bookmarked";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import SingleMoviePage from "./pages/dynamic/singleMoviePage/SingleMoviePage";
import SinglePersonPage from "./pages/dynamic/singlePersonPage/SinglePersonPage";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/register" element={<Register />} />
					<Route path="/user/login" element={<Login />} />
					{/* <Route path="/media/:category" element={<Media />} /> */}
					<Route path="/media/movie/:id" element={<SingleMoviePage />} />
					<Route path="/person/:id" element={<SinglePersonPage />} />
					<Route path="/media/movies" element={<Movies />} />
					<Route path="/media/series" element={<Series />} />
					<Route path="/media/bookmarked" element={<Bookmarked />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
