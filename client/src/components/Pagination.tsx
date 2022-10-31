import { useEffect, useMemo, useState } from "react";
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
	const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset, setItemOffset] = useState(0);

	const { totalPageCount, currentPage, sizePerPage, minPageCount } = pageInfos;
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + sizePerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(numberOfPagesArray.slice(itemOffset, endOffset));
		setPageInfos({
			...pageInfos,
			totalPageCount: Math.ceil(numberOfPagesArray.length / sizePerPage),
		});
	}, [itemOffset, sizePerPage]);

	const numberOfPagesArray: any = [];
	for (let index = 0; index <= totalPageCount; index++) {
		numberOfPagesArray.push(index);
	}

	const handlePageClick = (e: any) => {
		const newOffset = (e.selected * sizePerPage) % numberOfPagesArray.length;
		console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};

	return (
		<>
			{numberOfPagesArray}
			<ReactPaginate breakLabel="..." nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={sizePerPage} previousLabel="< previous" />
		</>
	);
};

export default Pagination;
