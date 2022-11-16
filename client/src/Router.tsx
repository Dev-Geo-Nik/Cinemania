// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";
import "./assets/css/index.scss";
import Bookmarked from "./pages/bookmark/Bookmarked";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Movies from "./pages/movies/Movies";
import SingleMoviePage from "./pages/dynamic/singleMoviePage/SingleMoviePage";
import SinglePersonPage from "./pages/dynamic/singlePersonPage/SinglePersonPage";
import Movies_filter from "./pages/movies_filter/Movies_filter";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/register" element={<Register />} />
					<Route path="/user/login" element={<Login />} />
					<Route path="/media/movies/filter" element={<Movies_filter />} />
					<Route path="/media/movie/:id" element={<SingleMoviePage />} />
					<Route path="/person/:id" element={<SinglePersonPage />} />
					<Route path="/media/movies" element={<Movies />} />
					<Route path="/media/bookmarked" element={<Bookmarked />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
