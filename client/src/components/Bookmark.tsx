import styles from "./bookmarkSave.module.scss";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";
import { ActionTypes } from "../context/Actions";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { json } from "node:stream/consumers";

interface Props {
	media: any;
	bookmarked?: boolean;
	remove_person_bookmarked?: boolean;
}

const Bookmark: React.FC<Props> = ({ media, bookmarked, remove_person_bookmarked }) => {
	const {
		state: { display_user_modal, user },
		dispatch,
	} = useGeneralContext();
	const { pathname } = useLocation();
	let navigate = useNavigate();

	const isBookmarked = false;
	// console.log(location);
	const handlerClick = () => {
		if (!user) {
			return navigate("/user/login");
		}

		const axios_obj = axios.create();
		axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
		axios_obj.defaults.headers.common["Accept"] = "application/json";

		if (bookmarked) {
			axios_obj
				.post("http://localhost:8000/api/bookmark/movie/save", {
					movie_id: media.movie_id,
					name: media.name,
					media_type: "movie",
					poster_path: media.poster_path,
					release_date: media.release_date,
					vote_average: media.vote_average,
					genre_ids: JSON.stringify(media.genre_ids),
					user_id: user.user_id,
				})
				.then((res) => {
					dispatch({ type: ActionTypes.REMOVE_BOOKMARK_MOVIE });
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			if (media.genre_ids) {
				const name = media.original_title ? media.original_title : media.name;
				axios_obj
					.post("http://localhost:8000/api/bookmark/movie/save", {
						movie_id: media.id,
						name: name,
						media_type: "movie",
						poster_path: media.poster_path,
						release_date: media.release_date,
						vote_average: media.vote_average,
						genre_ids: JSON.stringify(media.genre_ids),
						user_id: user.user_id,
					})
					.then((res) => {
						// console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
			}

			if (media.genres) {
				axios_obj
					.post("http://localhost:8000/api/bookmark/movie/save", {
						movie_id: media.id,
						name: media.original_title,
						media_type: "movie",
						poster_path: media.poster_path,
						release_date: media.release_date,
						vote_average: media.vote_average,
						genre_ids: JSON.stringify(media.genres),
						user_id: user.user_id,
					})
					.then((res) => {
						// console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}

		if (remove_person_bookmarked) {
			axios_obj
				.post("http://localhost:8000/api/bookmark/person/save", {
					person_id: media.person_id,
					name: media.name,
					category: "person",
					profile_path: media.profile_path,
					known_for_department: "Acting",
					user_id: user.user_id,
				})
				.then((res) => {
					// console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			if (media.media_type === "person" || media.also_known_as || media.known_for_department) {
				const name = media.original_name ? media.original_name : media.name;
				axios_obj
					.post("http://localhost:8000/api/bookmark/person/save", {
						person_id: media.id,
						name: name,
						category: "person",
						profile_path: media.profile_path,
						known_for_department: "Acting",
						user_id: user.user_id,
					})
					.then((res) => {
						// console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	return (
		<div className={styles.bookmark_icon_container} onClick={handlerClick}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
