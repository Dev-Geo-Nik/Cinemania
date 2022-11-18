import styles from "./searchBar.module.scss";

// Libraries
import { MdSearch } from "react-icons/md";
import { useGeneralContext } from "../context/GeneralContext";
import { ActionTypes } from "../context/Actions";

interface Props {
	label: string;
	path: string;
}

const SearchBar: React.FC<Props> = ({ label, path }) => {
	const { dispatch } = useGeneralContext();

	const handlerFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		dispatch({ type: ActionTypes.UPDATE_FILTER_SEARCH, payload: { searchValue: value, searchPath: path } });
	};

	return (
		<div className={styles.search_bar}>
			<div className={styles.input_container}>
				<MdSearch className={styles.search_icon} />
				<input type="text" placeholder={label} className={styles.input_text} onChange={handlerFilter} />
			</div>
		</div>
	);
};

export default SearchBar;
