import { MdLogout } from "react-icons/md";
import { useGeneralContext } from "../context/GeneralContext";
import styles from "./logout.module.scss";
import axios from "axios";
import { ActionTypes } from "../context/Actions";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
	const {
		state: { user, BACKEND_URL },
		dispatch,
	} = useGeneralContext();
	let navigate = useNavigate();
	const handlerClick = () => {
		const asyncFetch = async () => {
			try {
				const options = {
					method: "Post",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						withCredentials: "include",
						Authorization: `Bearer ` + user.token,
						// body: JSON.stringify(user.token),
					},
				};

				// @ts-ignore
				const res = await fetch(`${BACKEND_URL}/user/logout`, options);
				console.log(res);
				if (res.status >= 200 && res.status < 300) {
					const response_data = await res.json();
					if (response_data.status_message) {
						// serError(true);
						console.log(response_data.status_message);
						return;
					}
					localStorage.clear();
					dispatch({ type: ActionTypes.LOGOUT_USER });
					return navigate("/");
				}
			} catch (err: any) {}
		};

		// asyncFetch();

		const instance = axios.create({
			baseURL: "http://localhost:8000/api",
		});
		instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

		instance
			.post("/user/logout")
			.then((res) => {
				localStorage.clear();
				dispatch({ type: ActionTypes.LOGOUT_USER });
				return navigate("/");
			})
			.catch((err) => {
				localStorage.clear();
				// console.log(err);
				return navigate("/");
			});
	};

	return (
		<div className={styles.logout_container} onClick={handlerClick}>
			<MdLogout className={`${styles.icon} ${styles.logout_icon}`} />
		</div>
	);
};

export default Logout;
