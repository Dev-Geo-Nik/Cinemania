import styles from "./searchBar.module.scss";

// Libraries
import { MdSearch } from "react-icons/md";

interface Props {
	label: string;
}

const SearchBar: React.FC<Props> = ({ label }) => {
	return (
		<div className={styles.search_bar}>
			<div className={styles.input_container}>
				<MdSearch className={styles.search_icon} />
				<input type="text" placeholder={label} className={styles.input_text} />
			</div>
		</div>
	);
};

export default SearchBar;
