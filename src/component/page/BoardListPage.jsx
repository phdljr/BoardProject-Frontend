import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { Card } from "react-bootstrap";
import "../../style/AlignmentCenter.css";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
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
      .catch(() => setLoadStatus(LOAD_STATUS.error));
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
      <Card body className="alignmentCenter normalPadding shadow">
        데이터 요청중...
      </Card>
    );
  }
  if (loadStatus === LOAD_STATUS.error) {
    return (
      <Card body className="alignmentCenter normalPadding shadow">
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
      <Pagination style={{ justifyContent: "center" }}>
        <Pagination.First
          disabled={currentPageNumber === 1}
          onClick={(e) => {
            movePage(1, e);
          }}
        />
        <Pagination.Prev
          disabled={!pageData?.previousPage}
          onClick={(e) => {
            movePage(currentPageNumber - 1, e);
          }}
        />
        {pageData.pageList.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === pageData.currentPageNumber}
            onClick={(e) => {
              movePage(pageNumber, e);
            }}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={!pageData?.nextPage}
          onClick={(e) => {
            movePage(currentPageNumber + 1, e);
          }}
        />
        <Pagination.Last
          onClick={(e) => {
            movePage(pageData.totalPageNumber, e);
          }}
        />
      </Pagination>
    </>
  );
}
