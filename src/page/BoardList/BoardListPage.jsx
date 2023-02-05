import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination/Pagination";
import { getBoardList } from "../../api";
import BoardList from "../../component/BoardList/BoardList";

const LOAD_STATUS = { loading: "loading", idle: "idle", error: "error" };

export default function BoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loadStatus, setLoadStatus] = useState(LOAD_STATUS.loading);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadStatus(LOAD_STATUS.loading);
    getBoardList(currentPageNumber)
      .then(({ boardList: newBoardList, ...newPageData }) => {
        setBoardList(newBoardList);
        setPageData(newPageData);
        setLoadStatus(LOAD_STATUS.idle);
      })
      .catch(() => setLoadStatus(LOAD_STATUS.error));
  }, [currentPageNumber]);

  function movePage(pageNumber) {
    setCurrentPageNumber(pageNumber);
    navigate(`/board?page=${pageNumber}`);
  }

  if (loadStatus === LOAD_STATUS.loading) {
    return (
      <Card body className="center m-5 shadow">
        데이터 요청중...
      </Card>
    );
  }
  if (loadStatus === LOAD_STATUS.error) {
    return (
      <Card body className="center m-5 shadow">
        데이터를 가져오지 못했습니다.
      </Card>
    );
  }

  return (
    <div className="pt-3">
      <BoardList boardList={boardList} />
      <Pagination
        pageList={pageData.pageList}
        currentPageNumber={pageData.currentPageNumber}
        nextPage={pageData.nextPage}
        previousPage={pageData.previousPage}
        totalPageNumber={pageData.totalPageNumber}
        onChangePage={movePage}
      />
    </div>
  );
}
