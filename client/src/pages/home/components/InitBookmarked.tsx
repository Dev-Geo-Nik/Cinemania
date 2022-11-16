import axios from "axios";
import { useEffect } from "react";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";

const InitBookmarked: React.FC = () => {
	const {
		state: { favMovies, favSeries, bookmarkedFilter, user, bookmarks },
		dispatch,
	} = useGeneralContext();

	useEffect(() => {
		if (user) {
			const axios_obj = axios.create();
			axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
			axios_obj.defaults.headers.common["Accept"] = "application/json";
			axios_obj
				.post("http://localhost:8000/api/bookmarks", {
					user_id: user.user_id,
				})
				.then((res) => {
					// console.log(res.data.data);

					dispatch({ type: ActionTypes.FETCH_BOOKMARKS, payload: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return <></>;
};

export default InitBookmarked;
