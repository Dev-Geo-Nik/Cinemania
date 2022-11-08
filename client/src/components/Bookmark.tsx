import styles from "./bookmarkSave.module.scss";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";
import { ActionTypes } from "../context/Actions";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface Props {
	isBookmarked?: boolean;
}

const Bookmark: React.FC<Props> = ({ isBookmarked }) => {
	const {
		state: { display_user_modal },
		dispatch,
	} = useGeneralContext();
	const { pathname } = useLocation();
	let navigate = useNavigate();
	const user = false;

	const handlerClick = (e: any) => {
		if (!user) {
			return navigate("/user/login");
		} else {
		}
	};

	return (
		<div className={styles.bookmark_icon_container} onClick={handlerClick}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
