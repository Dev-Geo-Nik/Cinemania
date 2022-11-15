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
	isBookmarked?: boolean;
}

const Bookmark: React.FC<Props> = ({ media, isBookmarked }) => {
	const {
		state: { display_user_modal, user },
		dispatch,
	} = useGeneralContext();
	const { pathname } = useLocation();
	let navigate = useNavigate();

	const handlerClick = () => {
		if (!user) {
			return navigate("/user/login");
		}
		const axios_obj = axios.create();
		axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
		axios_obj.defaults.headers.common["Accept"] = "application/json";

		if (media.media_type === "movie") {
			axios_obj
				.post("http://localhost:8000/api/bookmark/movie/save", {
					movie_id: media.id,
					name: media.original_title,
					media_type: media.media_type,
					poster_path: media.poster_path,
					release_date: media.release_date,
					vote_average: media.vote_average,
					genre_ids: JSON.stringify(media.genre_ids),
					user_id: user.user_id,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (media.title || media.budget) {
			console.log(media);
			const genres = media.genres ? media.genres : media.genre_ids;

			axios_obj
				.post("http://localhost:8000/api/bookmark/movie/save", {
					movie_id: media.id,
					name: media.title,
					media_type: "movie",
					poster_path: media.poster_path,
					release_date: media.release_date,
					vote_average: media.vote_average,
					genre_ids: JSON.stringify(genres),
					user_id: user.user_id,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (media.media_type === "person" || media.also_known_as || media.known_for_department) {
			const name = media.original_name ? media.original_name : media.name;
			console.log(media);
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
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className={styles.bookmark_icon_container} onClick={handlerClick}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
