import { useEffect, useState } from "react";
import { ActionTypes } from "../context/Actions";
import { useGeneralContext } from "../context/GeneralContext";
import styles from "./mediaSection.module.scss";
import Pagination from "./Pagination";
import SingleCard from "./SingleCard";

interface Props {
	action: ActionTypes;
	path: string;
	section_title: string;
	data: any;
}

const MediaSection: React.FC<Props> = ({ action, section_title, path, data }) => {
	const {
		state: { BACKEND_URL },
		dispatch,
	} = useGeneralContext();

	const [page, setPage] = useState();

	let displayMedia;

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}${path}`);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					if (responseData) {
						console.log(responseData);
						dispatch({ type: action, payload: responseData.results });
					}
				}
			} catch (err: any) {}
		};
		asyncFetch();
	}, [page]);

	if (data) {
		displayMedia = data.map((movie: any, index: any) => {
			return <SingleCard key={index} media={movie} />;
		});
	}

	//Todo Make pagination buttons

	return (
		<section className={styles.media_section}>
			<h2 className={styles.section_title}>{section_title}</h2>
			<div className={styles.wrapper}>{displayMedia}</div>

			<Pagination />
		</section>
	);
};

export default MediaSection;
