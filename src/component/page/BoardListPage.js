import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Card } from 'react-bootstrap';
import '../../style/AlignmentCenter.css'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BoardListPage() {
    const [boardList, setBoardList] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loadData, isLoadData] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_HOST + `/board?page=${currentPageNumber}`)
            .then(res => {
                const { boardList, ...pageData } = res.data;
                setBoardList(boardList);
                setPageData(pageData);
                isLoadData(true);
                console.log(res.data);
            })
            .catch(() => {
                isLoadData(false);
                console.log("실패");
            })
    }, [currentPageNumber])

    function formatDate(date) {
        let result = date[0] + "-" + date[1] + "-" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5];
        return result;
    }

    function movePage(pageNumber, e) {
        setCurrentPageNumber(pageNumber);
        navigate(`/board?page=${pageNumber}`);
    }

    if (loadData === null) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터 요청중...</Card>
        )
    }
    if (!loadData) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터를 가져오지 못했습니다.</Card>
        )
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
                <Pagination.First disabled={currentPageNumber === 1 ? true : false} onClick={(e) => { movePage(1, e) }} />
                <Pagination.Prev disabled={!pageData.previousPage} onClick={(e) => { movePage(currentPageNumber - 1, e) }} />
                {pageData.pageList.map((pageNumber, index) => (
                    <Pagination.Item key={index} active={pageNumber === pageData.currentPageNumber ? true : false} onClick={(e) => { movePage(pageNumber, e) }}>
                        {pageNumber}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={!pageData.nextPage} onClick={(e) => { movePage(currentPageNumber + 1, e) }} />
                <Pagination.Last onClick={(e) => { movePage(pageData.totalPageNumber, e) }} />
            </Pagination>
        </>
    )
}