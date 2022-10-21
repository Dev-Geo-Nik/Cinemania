import Bookmark from "./Bookmark";
import styles from "./singleCard.module.scss";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";

interface Props {
	media: any;
}

const SingleCard: React.FC<Props> = ({ media }) => {
	const { isBookmarked, regular, year, category, rating, title } = media;
	return (
		<>
			{/* <div className={styles.single_container}>
				<Bookmark isBookmarked={isBookmarked} />
				<img src={require(`../../../${regular.large}`)} alt="" className={styles.image} />
				<div className={styles.detail_container}>
					<p className={styles.year}>{year}</p>
					<li className={styles.list_item}></li>
					<span className={styles.span_flex}>
						{category === "Movie" ? <MdLocalMovies className={styles.movie_icon} /> : <MdLiveTv className={styles.movie_icon} />}
						<span className={styles.movie_text}>{category}</span>
					</span>
					<li className={styles.list_item}>{rating}</li>
				</div>
				<p className={styles.title}>{title}</p>
			</div> */}
		</>
	);
};

export default SingleCard;
