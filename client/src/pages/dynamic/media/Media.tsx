import { Navigate, useLocation } from "react-router-dom";
import Navigation from "../../../components/Navigation";
import SearchBar from "../../../components/SearchBar";
import SingleCard from "../../../components/SingleCard";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useCurrentData } from "../../../hooks/useCurrentData";
import { findPath } from "../../../utils/helpers";
import styles from "./media.module.scss";

interface Props {}

const Media: React.FC<Props> = () => {
	const {
		state: { searchFilter },
	} = useGeneralContext();
	const { pathname } = useLocation();
	const requestShowCategory = pathname.split("/")[2];
	// console.log(requestShowCategory);
	const category = findPath(requestShowCategory);
	const currentShows = useCurrentData(category);

	if (category === "") {
		// todo add notfound error page
		return <Navigate to="/" state={{ from: pathname }} replace />;
	}

	let displayShows;

	if (searchFilter) {
		const filtered = currentShows.filter((a: any) => {
			return a.title.toLowerCase().includes(searchFilter);
		});

		displayShows = filtered.map((movie: any, index: any) => {
			const {
				thumbnail: { regular },
			} = movie;

			// return <SingleCard key={index} media={movie} image={<img src={require(`../../../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	if (searchFilter.length === 0) {
		displayShows = currentShows.map((movie: any, index: any) => {
			const {
				thumbnail: { regular },
			} = movie;
			// return <SingleCard key={index} media={movie} image={<img src={require(`../../../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	return (
		<section className={styles.media}>
			<Navigation />
			<div className={styles.container}>
				<SearchBar label={category === "movies" ? `Search for movies` : "Search for series"} path="movies" />
				<h2 className={styles.section_title}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
				<div className={styles.wrapper}>{displayShows}</div>
			</div>
		</section>
	);
};

export default Media;
