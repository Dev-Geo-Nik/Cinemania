import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<CircularProgressbar
			value={rating}
			text={`${rating}%`}
			styles={{
				text: {
					fill: "#fff",
				},
				path: {
					stroke: rating > 80 ? "#00ff00" : rating < 65 || rating > 45 ? "#FFFF00" : "#FFA500",
				},
			}}
		/>
	);
};

export default Rating;
