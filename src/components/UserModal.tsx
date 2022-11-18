import { useGeneralContext } from "../context/GeneralContext";
import styles from "./userModal.module.scss";

const UserModal: React.FC = () => {
	const {
		state: { display_user_modal },
	} = useGeneralContext();

	if (display_user_modal) {
		// document.body.style.overflowY = "hidden";
	} else {
		// document.body.style.overflow = "auto";
	}

	return (
		<>
			{/* <div className={styles.background_modal}></div> */}
			{/* <div className={styles.container}>
				<div className={styles.text_content}>
					<h2> REGISTER OR LOGIN</h2>
				</div>
			</div> */}
		</>
	);
};

export default UserModal;
