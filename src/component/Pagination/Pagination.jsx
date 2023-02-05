import { Pagination } from "react-bootstrap";

/**
 * @typedef {{
 *  pageList: number[],
 *  currentPageNumber: number,
 *  totalPageNumber : number,
 *  nextPage: boolean,
 *  previousPage: boolean,
 *  onChangePage: (page:number) => void
 * }} PaginationProps
 */

/**
 *
 * @param {PaginationProps} props
 * @returns
 */
function MyPagination({
  pageList,
  currentPageNumber,
  totalPageNumber,
  nextPage,
  previousPage,
  onChangePage,
}) {
  return (
    <Pagination style={{ justifyContent: "center" }}>
      <Pagination.First disabled={currentPageNumber === 1} onClick={() => onChangePage(1)} />
      <Pagination.Prev
        disabled={!previousPage}
        onClick={() => onChangePage(currentPageNumber - 1)}
      />
      {pageList.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPageNumber}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={!nextPage} onClick={() => onChangePage(currentPageNumber + 1)} />
      <Pagination.Last onClick={() => onChangePage(totalPageNumber)} />
    </Pagination>
  );
}

export default MyPagination;
