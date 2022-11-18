import styles from "./buttonRegister.module.scss";

interface Props {
	text?: string;
}

const ButtonRegister: React.FC<Props> = ({ text }) => {
	return (
		<button className={styles.btn_register_form}>
			<span></span> {text ? text : " Create an account"}
		</button>
	);
};

export default ButtonRegister;
