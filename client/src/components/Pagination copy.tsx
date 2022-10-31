import { useMemo, useState } from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useGeneralContext } from "../context/GeneralContext";

interface Props {
	totalCount: number;
	pageSize: number;
	siblingCount: number;
	currentPage: number;
	data: any;
}

const Pagination: React.FC = () => {
	const {
		state: { upcoming_movies },
	} = useGeneralContext();

	const [inputValue, setInputValue] = useState("");

	const [pageInfos, setPageInfos] = useState({
		totalPageCount: 100,
		minPageCount: 1,
		sizePerPage: 20,
		siblingCount: 2,
		currentPage: 1,
	});

	const { totalPageCount, currentPage, sizePerPage, minPageCount } = pageInfos;
	const numberOfPagesArray: any = [];
	for (let index = 0; index <= totalPageCount; index++) {
		numberOfPagesArray.push(index);
	}

	const handlerListClick = (i: number) => {
		setPageInfos({
			...pageInfos,
			currentPage: i,
		});
	};

	const displayPages = numberOfPagesArray.map((i: any) => {
		return (
			<div key={i} className={styles.list_item_wrapper} onClick={() => handlerListClick(i)}>
				<li className={currentPage === i ? `${styles.list_item} ${styles.active}` : styles.list_item}>{i}</li>
			</div>
		);
	});

	const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
	};
	console.log(inputValue);
	const handleNextClick = () => {
		setPageInfos({
			...pageInfos,
			currentPage: currentPage + 1,
		});
	};

	const handlePrevClick = () => {
		if (currentPage > 1) {
			setPageInfos({
				...pageInfos,
				currentPage: currentPage - 1,
			});
		}
	};

	const handleButtonClick = () => {
		if (!isNaN(+inputValue) && +inputValue > 0 && +inputValue < totalPageCount) {
			setPageInfos({
				...pageInfos,
				currentPage: +inputValue,
			});
		}
	};

	// page ellipses

	let pageIncrementEllipses = null;
	if (displayPages.length > sizePerPage) {
		pageIncrementEllipses = (
			<li className={styles.ellipses_dots} onClick={handleNextClick}>
				....
			</li>
		);
	}
	let pageDecrementEllipses = null;
	if (minPageCount >= 1) {
		pageDecrementEllipses = <li className={styles.ellipses_dots}>....</li>;
	}

	let displayGroupPages;

	if (pageInfos) {
		if (currentPage > 2) {
			displayGroupPages = (
				<>
					{pageIncrementEllipses}

					{displayPages[currentPage - 1]}
					{displayPages[currentPage]}
					{displayPages[currentPage + 1]}
					{pageDecrementEllipses}
				</>
			);
		}

		if (currentPage > 1) {
			displayGroupPages = (
				<>
					{displayPages[currentPage + 1]}
					{displayPages[currentPage + 2]}
					{displayPages[currentPage + 3]}
					{displayPages[currentPage + 4]}
					{pageDecrementEllipses}
				</>
			);
		}

		if (currentPage === 1) {
			displayGroupPages = (
				<>
					{displayPages[currentPage + 1]}
					{displayPages[currentPage + 2]}
					{displayPages[currentPage + 3]}
					{displayPages[currentPage + 4]}
					{pageDecrementEllipses}
				</>
			);
		}
	}

	return (
		<ul className={styles.list}>
			<li>
				<button onClick={handlePrevClick} disabled={currentPage === displayPages[1]}>
					Prev
				</button>
			</li>
			{/* {pageIncrementEllipses} */}

			{displayPages[1]}
			{displayGroupPages}
			{displayPages[totalPageCount]}
			<li>
				<button onClick={handleNextClick} disabled={currentPage === displayPages[displayPages.length - 1]}>
					&gt;Next
				</button>
			</li>

			{/* <li>
				<input type="text" placeholder="Go to page" value={inputValue} onChange={handlerOnChange} />
				<button onClick={handleButtonClick}>Go</button>
			</li> */}
		</ul>
	);
};

export default Pagination;
