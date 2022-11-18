import { useGeneralContext } from "../context/GeneralContext";

export const useCurrentData = (requestShowCategory: string) => {
	const {
		state: { movies, series },
	} = useGeneralContext();
	switch (requestShowCategory) {
		case "movies":
			return movies;

		case "series":
			return series;

		default:
			return "";
	}
};
