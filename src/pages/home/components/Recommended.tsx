import styles from "./recommended.module.scss";
import { data } from "../../../data/data";
import Bookmark from "../../../components/Bookmark";
import { useGeneralContext } from "../../../context/GeneralContext";
import SingleCard from "../../../components/SingleCard";

const Recommended: React.FC = () => {
	const {
		state: { allData },
	} = useGeneralContext();

	let displayRecommendedMovies = allData.map((movie: any, index: any) => {
		const {
			title,
			thumbnail: { regular },
			category,
			rating,
			year,
			isBookmarked,
		} = movie;

		// !why  npm start stuck at compiling???
		// return <SingleCard media={movie} key={index} />;
		return <div key={index}>hi</div>;
	});
	return (
		<section className={styles.recommended}>
			<h2 className={styles.section_title}>Recommended for you</h2>
			<div className={styles.wrapper}>{displayRecommendedMovies}</div>
		</section>
	);
};

export default Recommended;
