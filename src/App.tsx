// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// local
import Home from "./pages/home/Home";

const App: React.FC = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/country/:id" element={<CountrySinglePage />} /> */}
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
