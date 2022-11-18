import { useEffect, useRef, useState } from "react";
import { ActionTypes } from "../context/Actions";
import { useGeneralContext } from "../context/GeneralContext";
import { findActionTypeForUpdate } from "../utils/helpers";
import styles from "./pagination.module.scss";

interface Props {
	// currentPage: number;
	// maxPageLimit: number;
	// minPageLimit: number;
	maxPages: number;
	action: ActionTypes;
}

const Pagination: React.FC<Props> = ({ maxPages, action }) => {
	const {
		state: { upcoming_movies },
		dispatch,
	} = useGeneralContext();
	const pageNumberLimit = 5;

	const [currentPage, setCurrentPage] = useState(1);
	const [maxPageLimit, setMaxPageLimit] = useState(5);
	const [minPageLimit, setMinPageLimit] = useState(0);
	const [requestNewPage, setRequestNewPage] = useState(false);
	const totalPages = maxPages - 1;

	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	useEffect(() => {
		const actionType = findActionTypeForUpdate(action);

		if (requestNewPage) {
			// @ts-ignore
			dispatch({ type: actionType, payload: currentPage });
			setRequestNewPage(false);
		}
	}, [requestNewPage]);

	const handleNextClick = () => {
		setRequestNewPage(true);
		if (currentPage + 1 > maxPageLimit) {
			setMaxPageLimit(maxPageLimit + pageNumberLimit);
			setMinPageLimit(minPageLimit + pageNumberLimit);
		}

		setCurrentPage((prev) => prev + 1);
	};
	const handlePrevClick = () => {
		setRequestNewPage(true);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageLimit(maxPageLimit - pageNumberLimit);
			setMinPageLimit(minPageLimit - pageNumberLimit);
		}
		setCurrentPage((prev) => prev - 1);
	};

	// useFindAction(action, payload);

	const handlerClick = (page: number) => {
		setRequestNewPage(true);
		setCurrentPage(page);
	};

	const pageNumbers = pages.map((page: any) => {
		if (page <= maxPageLimit && page > minPageLimit) {
			return (
				<div key={page} className={styles.list_item_wrapper} onClick={() => handlerClick(page)}>
					<li className={currentPage === page ? `${styles.list_item} ${styles.active}` : styles.list_item}>{page}</li>
				</div>
			);
		} else {
			return null;
		}
	});
	// useFindAction(action, payload);

	// page ellipses
	let pageIncrementEllipses = null;
	if (pages.length > maxPageLimit) {
		pageIncrementEllipses = (
			<li onClick={handleNextClick} className={styles.ellipses_dots}>
				&hellip;
			</li>
		);
	}
	let pageDecrementEllipses = null;
	if (minPageLimit >= 1) {
		pageDecrementEllipses = (
			<li onClick={handlePrevClick} className={styles.ellipses_dots}>
				&hellip;
			</li>
		);
	}

	const onPageChange = (pageNumber: any) => {
		setCurrentPage(pageNumber);
	};

	const handlerClickStart = () => {
		setRequestNewPage(true);
		setCurrentPage(1);
		setMaxPageLimit(5);
		setMinPageLimit(0);
	};

	return (
		<>
			<ul className={styles.list}>
				<li>
					<button onClick={handlePrevClick} disabled={currentPage === pages[0]} className={styles.buttons}>
						{"<"}
					</button>
				</li>
				{pageDecrementEllipses ? (
					<li className={styles.list_item} onClick={handlerClickStart}>
						{pages[0]}
					</li>
				) : null}
				{pageDecrementEllipses}
				{pageNumbers}
				{pageIncrementEllipses}
				{/* {pageIncrementEllipses ? (
				<li className={styles.list_item} onClick={() => handlerClick(totalPages)}>
					{totalPages}{" "}
				</li>
			) : null} */}
				<li>
					<button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]} className={styles.buttons}>
						{">"}
					</button>
				</li>
			</ul>
		</>
	);
};

export default Pagination;
