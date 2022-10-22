import styles from "./trending.module.scss";

import Bookmark from "../../../components/Bookmark";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import { useGeneralContext } from "../../../context/GeneralContext";

const Trending: React.FC = () => {
	const {
		state: { allData, homeFilter },
	} = useGeneralContext();

	let displayTrendingMovies = allData.map((movie: any, index: any) => {
		const {
			title,
			thumbnail: { regular },
			category,
			rating,
			year,
			isBookmarked,
		} = movie;

		return (
			<div key={`${movie}${index}`} className={styles.single_container}>
				<Bookmark isBookmarked={isBookmarked} />
				<img src={require(`../../../${regular.large}`)} alt="" className={styles.trending_image} />
				<div className={styles.movie_detail_container}>
					<p className={styles.year}>{year}</p>
					<li className={styles.list_item}></li>
					<span className={styles.span_flex}>
						{category === "Movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
						<span className={styles.movie_text}>{category}</span>
					</span>
					<li className={styles.list_item}>{rating}</li>
				</div>
				<p className={styles.movie_title}>{title}</p>
			</div>
		);
	});

	return (
		<>
			{!homeFilter ? (
				<section className={styles.trending}>
					<h2 className={styles.section_title}>Trending</h2>
					<div className={styles.movies_container}>{displayTrendingMovies}</div>
				</section>
			) : null}
		</>
	);
};

export default Trending;
