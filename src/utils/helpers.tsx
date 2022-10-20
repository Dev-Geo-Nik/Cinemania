export const getNumberOfWeek = () => {
	const today: any = new Date();
	const firstDayOfYear: any = new Date(today.getFullYear(), 0, 1);
	const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
	return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
