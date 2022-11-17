import axios from "axios";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Bookmark from "../../components/Bookmark";
import ButtonRegister from "../../components/ButtonRegister";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import SingleCard from "../../components/SingleCard";
import { ActionTypes } from "../../context/Actions";
import { useGeneralContext } from "../../context/GeneralContext";
import styles from "./bookmarked.module.scss";

const Bookmarked: React.FC = () => {
	const {
		state: { favMovies, favSeries, bookmarkedFilter, user, bookmarks, bookmark_remove },
		dispatch,
	} = useGeneralContext();

	let displayBookmarkedMovies;
	let displayBookmarkedPersonalities;

	useEffect(() => {
		if (user) {
			const axios_obj = axios.create();
			axios_obj.defaults.headers.common["Authorization"] = `Bearer  ${user.token}`;
			axios_obj.defaults.headers.common["Accept"] = "application/json";
			axios_obj
				.post("http://localhost:8000/api/bookmarks", {
					user_id: user.user_id,
				})
				.then((res) => {
					dispatch({ type: ActionTypes.FETCH_BOOKMARKS, payload: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [bookmark_remove]);

	const handler_remove_person = () => {
		dispatch({ type: ActionTypes.REMOVE_BOOKMARK_MOVIE });
	};

	const objectLength = Object.keys(bookmarks).length;
	if (objectLength > 0) {
		const { persons, movies } = bookmarks;

		displayBookmarkedMovies = movies.map((movie: any) => {
			return (
				<div key={movie.id}>
					<SingleCard media={movie} movie_id={movie.movie_id} bookmarked={true} />
				</div>
			);
		});

		displayBookmarkedPersonalities = persons.map((person: any) => {
			const { id, known_for_department, name, person_id, profile_path } = person;
			const imagePath = `https://image.tmdb.org/t/p/original/${profile_path}`;
			return (
				<span className={styles.single_container} key={person_id}>
					<div className={styles.bookmark_wrapper} onClick={handler_remove_person}>
						<Bookmark media={person} remove_person_bookmarked={true} />
					</div>
					<Link to={`/person/${person_id}`} key={id} className={styles.link}>
						<div className={styles.trending_person_image_container}>
							<LazyLoadImage alt={""} effect="blur" src={imagePath} className={styles.trending_person_image} />
						</div>
						<p className={styles.person_title}>{name}</p>
						<p className={styles.person_profession}>{known_for_department}</p>
					</Link>
				</span>
			);
		});
	}

	return (
		<section className={styles.Bookmarked}>
			<Navigation />
			<div className={styles.container}>
				{/* <SearchBar label="Search for bookmarked shows" path={"bookmarked"} /> */}
				<h2 className={styles.section_title}>Bookmarked Movies</h2>
				<div className={styles.movies_wrapper}>{displayBookmarkedMovies}</div>
				<h2 className={styles.section_title}>Bookmarked Personalities</h2>
				<div className={styles.persons_wrapper}>{displayBookmarkedPersonalities}</div>
			</div>
		</section>
	);
};

export default Bookmarked;
