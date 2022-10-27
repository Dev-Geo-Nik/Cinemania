import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import SingleCard from "../components/SingleCard";
import { useGeneralContext } from "../context/GeneralContext";
import styles from "./bookmarked.module.scss";

const Bookmarked: React.FC = () => {
	const {
		state: { favMovies, favSeries, bookmarkedFilter },
	} = useGeneralContext();

	let displayBookmarkedMovies;
	let displayBookmarkedSeries;

	if (bookmarkedFilter) {
		const filteredMovies = favMovies.filter((a: any) => {
			return a.title.toLowerCase().includes(bookmarkedFilter);
		});
		const filteredSeries = favSeries.filter((a: any) => {
			return a.title.toLowerCase().includes(bookmarkedFilter);
		});

		displayBookmarkedMovies = filteredMovies.map((movie: any, index: any) => {
			const {
				title,
				thumbnail: { regular },
			} = movie;

			// return <SingleCard key={index} media={movie} image={<img src={require(`./../${regular.large}`)} alt="" className={styles.image} />} />;
		});

		displayBookmarkedSeries = filteredSeries.map((movie: any, index: any) => {
			const {
				title,
				thumbnail: { regular },
			} = movie;

			// return <SingleCard key={index} media={movie} image={<img src={require(`./../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	if (bookmarkedFilter.length === 0) {
		displayBookmarkedMovies = favMovies.map((movie: any, index: any) => {
			const {
				title,
				thumbnail: { regular },
			} = movie;

			// return <SingleCard key={index} media={movie} image={<img src={require(`./../${regular.large}`)} alt="" className={styles.image} />} />;
		});

		displayBookmarkedSeries = favSeries.map((movie: any, index: any) => {
			const {
				title,
				thumbnail: { regular },
			} = movie;

			// return <SingleCard key={index} media={movie} image={<img src={require(`./../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	return (
		<section className={styles.Bookmarked}>
			<Navigation />
			<div className={styles.container}>
				<SearchBar label="Search for bookmarked shows" path={"bookmarked"} />
				<h2 className={styles.section_title}>Bookmarked Movies</h2>
				<div className={styles.wrapper}>{displayBookmarkedMovies}</div>
				<h2 className={styles.section_title}>Bookmarked TV Series</h2>
				<div className={styles.wrapper}>{displayBookmarkedSeries}</div>
			</div>
		</section>
	);
};

export default Bookmarked;
