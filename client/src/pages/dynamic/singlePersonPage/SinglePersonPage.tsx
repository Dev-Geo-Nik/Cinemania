// Libraries
import { Link, useLocation } from "react-router-dom";

//Local
import { useEffect, useState } from "react";
import Bookmark from "../../../components/Bookmark";
import ButtonRegister from "../../../components/ButtonRegister";
import Navigation from "../../../components/Navigation";
import { ActionTypes } from "../../../context/Actions";
import { useGeneralContext } from "../../../context/GeneralContext";
import { Cast, known_work, person_bio } from "../../../utils/types";
import styles from "./singlePersonPage.module.scss";
import Facebook_icon from "../../../assets/img/facebook_icon.png";
import Instagram_icon from "../../../assets/img/instagram_icon.png";
import Twitter_icon from "../../../assets/img/twitter_icon.png";
import KnownWork from "./components/KnownWork";

const SinglePersonPage: React.FC = () => {
	const {
		state: { BACKEND_URL, person_bio, person_known_for, person_socials },
		dispatch,
	} = useGeneralContext();
	const { pathname } = useLocation();
	const person_id = pathname.split("/")[2];
	const [error, setError] = useState(false);

	useEffect(() => {
		const asyncFetch = async () => {
			const person_details_url = `${BACKEND_URL}/person/${person_id}`;
			const known_for_work = `${BACKEND_URL}/person/work/${person_id}`;
			const social_media_ids = `${BACKEND_URL}/person/socials/${person_id}`;

			const urls = [person_details_url, known_for_work, social_media_ids];

			try {
				const response = await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));
				dispatch({ type: ActionTypes.FETCH_SINGLE_PERSON_DATA, payload: response });
			} catch (err: any) {
				setError(true);
			}
		};
		asyncFetch();
	}, []);

	let displayPersonPage;

	if (person_bio) {
		const { profile_path, name, biography, birthday, deathday, place_of_birth, popularity, homepage } = person_bio as person_bio;
		const { cast: movies_known_for } = person_known_for as known_work;
		const { facebook_id, instagram_id, twitter_id } = person_socials;
		displayPersonPage = (
			<>
				<div className={styles.person_container}>
					<div className={styles.bookmark_container}>
						<Bookmark />
					</div>
					<div className={styles.header}>
						<img src={`https://image.tmdb.org/t/p/original/${profile_path}`} className={styles.profile_image} alt={name} />
						<div className={styles.text_content}>
							<h2 className={styles.name}>{name}</h2>
							<h3 className={styles.biography_header}>Biography</h3>
							<p className={styles.biography_text}>{biography ? biography : "No known biography"}</p>

							<div className={styles.label_container}>
								<span className={styles.label}>Place of birth:</span>
								<span className={styles.label_text}> {place_of_birth}</span>
							</div>
							<div className={styles.label_container}>
								<span className={styles.label}>Official website:</span>
								<span className={styles.label_text}> {homepage ? homepage : "Unknown"}</span>
							</div>
							<div className={styles.label_container}>
								<span className={styles.label}>Birth date:</span>
								<span className={styles.label_text}> {birthday ? birthday : "Unknown"} </span>
							</div>
							{deathday && (
								<div className={styles.label_container}>
									<span className={styles.label}>Death day:</span>
									<span className={styles.label_text}> {deathday ? deathday : "Unknown"} </span>
								</div>
							)}

							<div className={styles.socials_container}>
								{facebook_id ? (
									<a href={`https://www.facebook.com/${facebook_id}`} target="_blank">
										<img src={Facebook_icon} alt="facebook icon" className={`${styles.social_icons} ${styles.facebook_icon}`} />
									</a>
								) : null}
								{instagram_id ? (
									<a href={`https://www.instagram.com/${instagram_id}`} target="_blank">
										<img src={Instagram_icon} alt="facebook icon" className={`${styles.social_icons} ${styles.facebook_icon}`} />
									</a>
								) : null}
								{twitter_id ? (
									<a href={`https://www.twitter.com/${twitter_id}`} target="_blank">
										<img src={Twitter_icon} alt="facebook icon" className={`${styles.social_icons} ${styles.facebook_icon}`} />
									</a>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<KnownWork />
			</>
		);
	}

	let errorModal = (
		<div className={styles.error_message_container}>
			<p className={styles.error_message}>The resource you requested could not be found</p>
			<Link to="/">
				<ButtonRegister text="Home" />
			</Link>
		</div>
	);
	return (
		<section className={styles.single_person_container}>
			<Navigation />
			<div className={styles.wrapper}>{error ? <>{errorModal}</> : <>{displayPersonPage}</>}</div>
		</section>
	);
};

export default SinglePersonPage;
