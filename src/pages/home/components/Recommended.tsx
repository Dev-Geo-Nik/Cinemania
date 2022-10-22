import styles from "./recommended.module.scss";
import { data } from "../../../data/data";
import Bookmark from "../../../components/Bookmark";
import { useGeneralContext } from "../../../context/GeneralContext";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import SingleCard from "../../../components/SingleCard";
import { useState } from "react";

const Recommended: React.FC = () => {
	const {
		state: { allData, homeFilter },
	} = useGeneralContext();
	let displayRecommendedMovies;
	if (homeFilter) {
		const filtered = allData.filter((a: any) => {
			return a.title.toLowerCase().includes(homeFilter);
		});

		displayRecommendedMovies = filtered.map((movie: any, index: any) => {
			const {
				thumbnail: { regular },
			} = movie;

			return <SingleCard key={index} media={movie} image={<img src={require(`../../../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	if (homeFilter.length === 0) {
		displayRecommendedMovies = allData.map((movie: any, index: any) => {
			const {
				thumbnail: { regular },
			} = movie;

			return <SingleCard key={index} media={movie} image={<img src={require(`../../../${regular.large}`)} alt="" className={styles.image} />} />;
		});
	}

	return (
		<section className={styles.recommended}>
			<h2 className={styles.section_title}>Recommended for you</h2>
			<div className={styles.wrapper}>{displayRecommendedMovies}</div>
		</section>
	);
};

export default Recommended;
