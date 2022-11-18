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

	const url = `${BACKEND_URL}/movies/movie/trailer-list/${single_movie?.id}`;
	const { data, error } = useFetch(url, {}, url);

	let displayVideo;
	if (data != null) {
		//  @ts-ignore
		if (data.results[0] != undefined) {
			displayVideo = (
				<div className={styles.video_container}>
					{/* @ts-ignore */}
					<ReactPlayer url={`https://www.youtube.com/watch?v=${data.results[0]["key"]}`} controls={true} className={styles.player} />
				</div>
			);
		}
	}

	return (
		<div className={styles.trailer}>
			{/* @ts-ignore */}
			<h2 className={styles.section_title}>{data != null ? (data.results ? "Movie trailer" : null) : null}</h2>
			{displayVideo}
		</div>
	);
};

export default Trailer;
