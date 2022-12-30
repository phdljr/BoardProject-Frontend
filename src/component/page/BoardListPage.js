import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Card } from 'react-bootstrap';
import '../../style/AlignmentCenter.css'
import { LinkContainer } from 'react-router-bootstrap';

export default function BoardListPage() {
    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [loadData, isLoadData] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/board?page=1")
            .then(res => {
                setBoardList(res.data.boardList)
                setPageList(res.data.pageList)
                setCurrentPageNumber(res.data.currentPageNumber)
                isLoadData(true)
                console.log(res.data)
            })
            .catch(() => {
                isLoadData(false)
                console.log("실패")
            })
    }, [])

    function formatDate(date) {
        let result = date[0] + "-" + date[1] + "-" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5]
        return result
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
                                <td>
                                    {board.title}
                                </td>
                                <td>{board.nickname}</td>
                                <td>{formatDate(board.registerDate)}</td>
                                <td>{board.hit}</td>
                            </tr>
                        </LinkContainer>
                    ))}
                </tbody>
            </Table>
            <Pagination style={{ justifyContent: "center" }}>
                <Pagination.First />
                <Pagination.Prev />
                {pageList.map((page, index) => (
                    <Pagination.Item key={index} active={page === currentPageNumber ? true : false}>{page}</Pagination.Item>
                ))}
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </>
    )
}