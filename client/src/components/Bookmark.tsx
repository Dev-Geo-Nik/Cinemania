import styles from "./bookmarkSave.module.scss";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";

interface Props {
	isBookmarked?: boolean;
}

const Bookmark: React.FC<Props> = ({ isBookmarked }) => {
	const {
		state: {},
		dispatch,
	} = useGeneralContext();
	const user = false;
	const handlerClick = (e: any) => {
		if (!user) {
			console.log("please log in or register");
			return;
		}
	};

	return (
		<div className={styles.bookmark_icon_container} onClick={handlerClick}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
