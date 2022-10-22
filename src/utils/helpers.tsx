export const findPath = (requestShowCategory: string) => {
	switch (requestShowCategory) {
		case "movies":
			return "movies";

		case "series":
			return "series";

		default:
			return "";
	}
};
