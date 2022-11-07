import { Link } from "react-router-dom";
import SingleCard from "../../../../components/SingleCard";
import { useGeneralContext } from "../../../../context/GeneralContext";
import styles from "./knownWork.module.scss";

const KnownWork: React.FC = () => {
	const {
		state: { person_known_for },
	} = useGeneralContext();

	let displayKnownWork;
	if (person_known_for) {
		displayKnownWork = person_known_for.cast.map((movie: any) => {
			return (
				<span key={`${movie.id} ${Math.random()}`} className={styles.link}>
					<SingleCard media={movie} />
				</span>
			);
		});
	}
	return (
		<>
			<h2 className={styles.section_title}>Known for </h2>
			<div className={styles.wrapper}>{displayKnownWork}</div>
		</>
	);
};

export default KnownWork;
