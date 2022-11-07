import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, NavLink } from "react-router-dom";
import Bookmark from "../../../../components/Bookmark";
import { ActionTypes } from "../../../../context/Actions";
import { useGeneralContext } from "../../../../context/GeneralContext";
import { Person } from "../../../../utils/types";
import styles from "./cast.module.scss";

const Cast: React.FC = () => {
	const {
		state: { BACKEND_URL, movie_cast, single_movie },
		dispatch,
	} = useGeneralContext();

	// useEffect(() => {
	// 	const asyncFetch = async () => {
	// 		try {
	// 			const res = await fetch(`${BACKEND_URL}/movies/movie/cast/${single_movie?.id}`);
	// 			if (res.status >= 200 && res.status < 300) {
	// 				const responseData = await res.json();
	// 				// console.log(responseData);
	// 				if (responseData) {
	// 					dispatch({ type: ActionTypes.FETCH_CAST_MOVIE, payload: responseData });
	// 				}
	// 			}
	// 		} catch (err: any) {}
	// 	};
	// 	asyncFetch();
	// }, [single_movie?.id]);

	let displayCast;
	if (movie_cast.cast) {
		const { cast } = movie_cast;

		displayCast = cast.map((person: Person) => {
			const { id, name, profile_path, character } = person;
			return (
				<Link to={`/person/${id}`} key={id} className={styles.actor_container}>
					<Bookmark />
					<div className={styles.image_wrapper}>
						<LazyLoadImage alt={name} effect="blur" src={`https://image.tmdb.org/t/p/original/${profile_path}`} className={styles.cast_image} width="auto" />
					</div>
					<div className={styles.text_container}>
						<h2 className={styles.real_name}>{name} </h2>
						<p className={styles.character_name}>{character} </p>
					</div>
				</Link>
			);
		});
	}

	return (
		<section className={styles.cast}>
			<h2 className={styles.section_title}>{`${single_movie?.title} Cast Actors`}</h2>
			<div className={styles.cast_wrapper}>{displayCast}</div>
		</section>
	);
};

export default Cast;
