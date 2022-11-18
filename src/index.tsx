import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.scss";

import { GeneralContextProvider } from "./context/GeneralContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<GeneralContextProvider>
			<App />
		</GeneralContextProvider>
	</React.StrictMode>
);
