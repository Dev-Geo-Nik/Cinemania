// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";
import "./assets/css/index.scss";
import Media from "./pages/dynamic/media/Media";
import Bookmarked from "./pages/Bookmarked";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user/register" element={<Register />} />
					<Route path="/user/login" element={<Login />} />
					<Route path="/media/:category" element={<Media />} />
					<Route path="/media/bookmarked" element={<Bookmarked />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
