import { useEffect, useState } from "react";

export const useFetch = (url: string, options: any = null) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				setLoading(true);
				const res = await fetch(url, options);
				if (res.status >= 200 && res.status < 300) {
					const responseData = await res.json();
					// console.log(typeof responseData);
					setData(responseData);
					setLoading(false);
				}
			} catch (err: any) {
				setError(err);
				setLoading(false);
			}
		};
		asyncFetch();
	}, [url]);

	return { data, error, loading };
};
