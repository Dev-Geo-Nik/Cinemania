// Libraries
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSpring, animated as a } from "react-spring";

// Local
import Navigation from "../../components/Navigation";
import { registerUserSchema } from "../../utils/helpers";
import styles from "./register.module.scss";
import { useState } from "react";
// import Logo from "../../assets/img/logo.svg";

type RegisterUser = {
	email: string;
	password: string;
	password_repeat: string;
};

const Register: React.FC = () => {
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
	} = useForm<RegisterUser>({
		resolver: yupResolver(registerUserSchema),
	});

	const onSubmit = (formData: RegisterUser) => {
		const postData = async () => {
			const registerUserPayload = {
				email: formData.email,
				password: formData.password,
				password_repeat: formData.password_repeat,
			};

			const request = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerUserPayload),
			};

			try {
				//   dispatch({type:ActionTypes.TOGGLE_LOADING ,payload:true})

				const res = await fetch("http://localhost:1340/api/auth/local/register", request);
				const data = await res.json();

				if (data.user) {
					// console.log(data.jwt)
					// console.log(data.user)
					// dispatch({type:ActionTypes.TOGGLE_LOADING ,payload:false})

					setSuccess(true);
					setErrorMessage("");
				}

				if (data.error) {
					// dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
					let message = data.error.message.includes("Email") ? data.error.message : "Username is already taken";
					setIsError(true);
					setErrorMessage(message);
				}
			} catch (err: any) {
				setIsError(true);
				setTimeout(() => {
					setShakeError(true);
				}, 100);

				setErrorMessage(err.message);
				// dispatch({ type: ActionTypes.TOGGLE_LOADING, payload: false });
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
		<section className={styles.register}>
			<Navigation />
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
						<h2 className={styles.section_title}>Sign Up</h2>
						<div className={styles.form_control}>
							<input type="email" placeholder="Email address" {...register("email")} />
						</div>
						{errors.email ? <span className={styles.error}>{errors.email.message}</span> : <span className={styles.error}></span>}
						<div className={styles.form_control}>
							<input type="password" placeholder="Password" {...register("password")} />
						</div>
						{errors.password ? <span className={styles.error}>{errors.password.message}</span> : <span className={styles.error}></span>}
						<div className={styles.form_control}>
							<input type="password" placeholder="Repeat password" {...register("password_repeat")} />
						</div>
						{errors.password_repeat ? <span className={styles.error}>{errors.password_repeat.message}</span> : <span className={styles.error}></span>}
						<button className={styles.btn_cta}>Create an account</button>
					</form>
					<div className={styles.link_container}>
						<span className={styles.span_link_text}>Already have an account?</span>
						<Link to="/user/login" className={styles.link_text}>
							Login
						</Link>
					</div>
				</a.div>
			</div>
		</section>
	);
};

export default Register;
