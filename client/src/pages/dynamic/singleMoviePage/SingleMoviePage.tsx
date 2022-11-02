import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import styles from "./singleMoviePage.module.scss";

const SingleMoviePage: React.FC = () => {
	const { pathname } = useLocation();
	const {
		state: { BACKEND_URL, single_movie },
		dispatch,
	} = useGeneralContext();

	const movie_id = pathname.split("/")[3];
	console.log(single_movie);

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/movie/${movie_id}`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						console.log(responseData);
						dispatch({ type: ActionTypes.FETCH_SINGLE_MOVIE, payload: responseData.results });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	return <></>;
};

export default SingleMoviePage;
