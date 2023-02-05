import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination/Pagination";
import { getBoardList } from "../../api";

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
      .catch((e) => {
        console.log(e);
        setLoadStatus(LOAD_STATUS.error);
      });
  }, [currentPageNumber]);

  function formatDate(date) {
    const result = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
    return result;
  }

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
    <>
      <Table hover>
        <thead>
          <tr>
            <th width="5%">번호</th>
            <th width="40%">제목</th>
            <th width="15%">작성자</th>
            <th width="20%">날짜</th>
            <th width="15%">조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <LinkContainer key={board.id} to={`/board/${board.id}`} style={{ cursor: "pointer" }}>
              <tr>
                <td>{board.id}</td>
                <td>{board.title}</td>
                <td>{board.nickname}</td>
                <td>{formatDate(board.registerDate)}</td>
                <td>{board.hit}</td>
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
      <Pagination
        pageList={pageData.pageList}
        currentPageNumber={pageData.currentPageNumber}
        nextPage={pageData.nextPage}
        previousPage={pageData.previousPage}
        totalPageNumber={pageData.totalPageNumber}
        onChangePage={movePage}
      />
    </>
  );
}
