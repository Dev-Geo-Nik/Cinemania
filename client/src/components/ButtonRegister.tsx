import styles from "./buttonRegister.module.scss";

const ButtonRegister: React.FC = () => {
	return (
		<button className={styles.btn_register_form}>
			<span></span> Create an account
		</button>
	);
};

export default ButtonRegister;
