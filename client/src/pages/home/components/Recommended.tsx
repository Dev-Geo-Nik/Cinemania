import styles from "./recommended.module.scss";
import { data } from "../../../data/data";
import Bookmark from "../../../components/Bookmark";
import { useGeneralContext } from "../../../context/GeneralContext";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import SingleCard from "../../../components/SingleCard";
import { useEffect, useState } from "react";
import { ActionTypes } from "../../../context/Actions";

const Recommended: React.FC = () => {
	const {
		state: { allData, homeFilter, BACKEND_URL, week_trending },
		dispatch,
	} = useGeneralContext();

	let displayRecommendedMovies;

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/movies/week-trending`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						dispatch({ type: ActionTypes.FETCH_WEEK_TRENDING, payload: responseData.results });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, []);

	if (week_trending) {
		displayRecommendedMovies = week_trending.map((movie: any, index: any) => {
			return <SingleCard key={index} media={movie} />;
		});
	}

	return (
		<section className={styles.recommended}>
			<h2 className={styles.section_title}>Weekly trending movies or TV series </h2>
			<div className={styles.recommended_wrapper}>{displayRecommendedMovies}</div>
		</section>
	);
};

export default Recommended;
