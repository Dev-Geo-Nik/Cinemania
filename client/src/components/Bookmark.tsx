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
		state: { display_user_modal, user },
		dispatch,
	} = useGeneralContext();
	const { pathname } = useLocation();

	return (
		<div className={styles.bookmark_icon_container}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
