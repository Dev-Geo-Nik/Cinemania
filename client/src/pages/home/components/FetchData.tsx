import axios from "axios";
import { useEffect } from "react";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";

const FetchData: React.FC = () => {
	const {
		state: { user, genre },
		dispatch,
	} = useGeneralContext();

	useEffect(() => {
		const axios_obj = axios.create();
		axios_obj
			.get("http://localhost:8000/api/movies/genre")
			.then((res) => {
				dispatch({ type: ActionTypes.FETCH_GENRE, payload: res.data.genres });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <></>;
};

export default FetchData;
