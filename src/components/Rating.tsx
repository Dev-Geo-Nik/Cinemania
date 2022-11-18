import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const styles = {
	backgroundColor: "rgba(255,255,255,0.2)",
};

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
	let color;
	if (rating >= 80) {
		color = "#00ff00";
	}

	if (rating < 80 && rating > 65) {
		color = "#27b30b";
	}
	if (rating < 65 && rating > 45) {
		color = "#FFFF00";
	}
	if (rating < 45 && rating > 35) {
		color = "#FFA500";
	}
	if (rating < 35) {
		color = "#d64106";
	}

	return (
		<CircularProgressbar
			value={rating}
			text={`${rating}%`}
			styles={{
				text: {
					fill: "#fff",
				},
				path: {
					stroke: color,
				},
			}}
		/>
	);
};

export default Rating;
