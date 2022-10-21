// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";
import "./assets/css/index.scss";
import Media from "./pages/dynamic/media/Media";

const App: React.FC = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/media/:category" element={<Media />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
