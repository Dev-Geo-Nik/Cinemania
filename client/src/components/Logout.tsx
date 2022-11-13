import { MdLogout } from "react-icons/md";
import { useGeneralContext } from "../context/GeneralContext";
import styles from "./logout.module.scss";

const Logout: React.FC = () => {
	const {
		state: { user, BACKEND_URL },
	} = useGeneralContext();

	console.log(user.token);
	const handlerClick = () => {
		const asyncFetch = async () => {
			try {
				const options = {
					method: "Post",
					credentials: "include",
					// prettier-ignore
					headers: {
							"Accept": "application/json",
							"Authorization": `Bearer  ${user.token}`,
							"Content-Type": "application/json",
	
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
					// dispatch({ type: ActionTypes.FETCH_TRENDING_DATA, payload: response_data.results });
				}
			} catch (err: any) {}
		};
		asyncFetch();
	};

	return (
		<div className={styles.logout_container} onClick={handlerClick}>
			<MdLogout className={`${styles.icon} ${styles.logout_icon}`} />
		</div>
	);
};

export default Logout;
