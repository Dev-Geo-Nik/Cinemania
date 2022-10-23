import styles from "./bookmarkSave.module.scss";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";

interface Props {
	isBookmarked: boolean;
}

const Bookmark: React.FC<Props> = ({ isBookmarked }) => {
	return (
		<div className={styles.bookmark_icon_container}>
			{isBookmarked ? <MdBookmark className={`${styles.book_icon} ${styles.book_save}`} /> : <MdOutlineBookmarkBorder className={`${styles.book_icon} ${styles.book_unsaved}`} />}
		</div>
	);
};

export default Bookmark;
