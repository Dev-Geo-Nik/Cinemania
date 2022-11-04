import styles from "./trailer.module.scss";
import { useFetch } from "../../../../hooks/useFetch";
import { useGeneralContext } from "../../../../context/GeneralContext";
import { Trailers } from "../../../../utils/types";

import ReactPlayer from "react-player/youtube";

interface Props {}
const Trailer: React.FC<Props> = ({}) => {
	const {
		state: { BACKEND_URL, single_movie },
	} = useGeneralContext();
	console.log();
	const url = `${BACKEND_URL}/movies/movie/trailer-list/${single_movie?.id}`;
	const { data, error } = useFetch(url, {}, url);

	let displayVideo;

	if (data != null) {
		// console.log();
		displayVideo = (
			<div className={styles.video_container}>
				{/* @ts-ignore */}
				<ReactPlayer url={`https://www.youtube.com/watch?v=${data.results[1]["key"]}`} controls={true} className={styles.player} />
			</div>
		);
	}

	return <div className={styles.trailer}>{displayVideo}</div>;
};

export default Trailer;
