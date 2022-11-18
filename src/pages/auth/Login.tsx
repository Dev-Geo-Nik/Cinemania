// Libraries
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSpring, animated as a } from "react-spring";
import { loginUserSchema } from "../../utils/helpers";

// Local
import Navigation from "../../components/Navigation";
import styles from "./login.module.scss";
import { useState } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import ButtonLogin from "../../components/ButtonLogin";
import Spinner from "../../components/Spinner";
import { ActionTypes } from "../../context/Actions";

// import Logo from "../../assets/img/logo.svg";

// Register and Login Page share the register.module.scss
type LoginUser = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const {
		state: { BACKEND_URL, isLoading },
		dispatch,
	} = useGeneralContext();

	let navigate = useNavigate();
	const [success, setSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [questionError, setQuestionError] = useState("");
	const [shakeError, setShakeError] = useState(false);

	const { x } = useSpring({
		from: { x: 0 },
		to: { x: shakeError ? 1 : 0 },
	});

	const {
		register,
		handleSubmit,
		reset,
		getFieldState,
		getValues,
		setError,
		watch,
		formState: { errors },
	} = useForm<LoginUser>({
		resolver: yupResolver(loginUserSchema),
	});

	const onSubmit = (formData: LoginUser) => {
		const postData = async () => {
			// prettier-ignore
			const loginUserPayload = {
				email: formData.email,
				password: formData.password
			};
			// prettier-ignore
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json", "Accept": "application/json" },
				body: JSON.stringify(loginUserPayload),
			};

			try {
				dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: true });

				const res = await fetch(`${BACKEND_URL}/user/login`, request);
				const data = await res.json();
				console.log(data);

				if (data.user) {
					const user = {
						email: data.user.name,
						token: data.authorisation.token,
						user_id: data.user.id,
					};
					localStorage.setItem("user", JSON.stringify(user));
					dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
					// @ts-ignore
					dispatch({ type: ActionTypes.INIT_USER });
					setSuccess(true);
					setIsError(false);
					setErrorMessage("");
					return navigate("/");
				}

				if (data.message) {
					dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
					let message = "Wrong username or password.";
					setErrorMessage(message);
					setIsError(true);
				}
			} catch (err: any) {
				dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
				setIsError(true);
				setTimeout(() => {
					setShakeError(true);
				}, 100);

				setErrorMessage(err.message);
				dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
			}
		};

		postData();
	};

	if (Object.keys(errors).length > 0) {
		setTimeout(() => {
			setShakeError(true);
		}, 100);
	}

	return (
		<section className={styles.login}>
			<Navigation />

			{isLoading && <Spinner />}
			<div className={styles.wrapper}>
				<a.div
					className={styles.form_container}
					style={{
						transform: x
							.to({
								range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
								output: [180, 220, 180, 220, 180, 220, 180, 200],
							})
							.to((x) => `translate3d(${x}px, 0px, 0px)`),
					}}
				>
					<form action="#" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<h2 className={styles.section_title}>Login</h2>
						<div className={styles.form_control}>
							<input type="email" placeholder="Email address" {...register("email")} />
						</div>
						{errors.email ? (
							<span className={styles.error}>{errors.email.message}</span>
						) : isError ? (
							<span className={styles.error}>{errorMessage}</span>
						) : (
							<span className={styles.error}></span>
						)}
						<div className={styles.form_control}>
							<input type="password" placeholder="Password" {...register("password")} />
						</div>
						{errors.password ? (
							<span className={styles.error}>{errors.password.message}</span>
						) : isError ? (
							<span className={styles.error}>{errorMessage}</span>
						) : (
							<span className={styles.error}></span>
						)}

						<ButtonLogin />
					</form>
					<div className={styles.link_container}>
						<span className={styles.span_link_text}>Don’t have an account?</span>
						<Link to="/user/register" className={styles.link_text}>
							Sign Up
						</Link>
					</div>
				</a.div>
			</div>
		</section>
	);
};

export default Login;
