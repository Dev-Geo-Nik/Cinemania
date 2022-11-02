import * as yup from "yup";
import { ActionTypes } from "../context/Actions";
import { useGeneralContext } from "../context/GeneralContext";

export const findPath = (requestShowCategory: string) => {
	switch (requestShowCategory) {
		case "movies":
			return "movies";

		case "series":
			return "series";

		default:
			return "";
	}
};

export const registerUserSchema = yup.object().shape({
	// username: yup.string().min(2, "Username must be at least 2 characters").required("Username is required"),
	email: yup.string().email("Please insert a valid email address").required("Email is required"),
	password: yup
		.string()
		.required("Please enter your password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			"Password must be min 6   characters and contain one uppercase, one lowercase, one Number and one Special case character"
		)
		.oneOf([yup.ref("password_repeat"), null], "Passwords must match"),
	password_repeat: yup
		.string()
		.required("Please enter password repeat ")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			"Password repeat  must be min 6   characters and contain one uppercase, one lowercase, one Number and one Special case character"
		)
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	// question: yup.string().required("Question is required"),
});

export const loginUserSchema = yup.object().shape({
	email: yup.string().min(2, "Email is required").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const findActionTypeForUpdate = (actionCategory: string) => {
	const {
		FETCH_TRENDING_PEOPLE,
		UPDATE_TRENDING_PEOPLE,
		FETCH_WEEK_TRENDING,
		UPDATE_WEEK_TRENDING,
		FETCH_TOP_RATED_MOVIES,
		UPDATE_TOP_RATED_MOVIES,
		FETCH_TOP_UPCOMING,
		UPDATE_TOP_UPCOMING,
		UPDATE_MOVIES_PLAYING_NOW,
		FETCH_MOVIES_PLAYING_NOW,
	} = ActionTypes;

	switch (actionCategory) {
		case FETCH_TRENDING_PEOPLE:
			return UPDATE_TRENDING_PEOPLE;

		case FETCH_WEEK_TRENDING:
			return UPDATE_WEEK_TRENDING;
		case FETCH_TOP_RATED_MOVIES:
			return UPDATE_TOP_RATED_MOVIES;
		case FETCH_TOP_UPCOMING:
			return UPDATE_TOP_UPCOMING;
		case FETCH_MOVIES_PLAYING_NOW:
			return UPDATE_MOVIES_PLAYING_NOW;

		default:
			return "";
	}
};
