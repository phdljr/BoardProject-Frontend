import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

export default function BoardListPage() {
    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8080/board")
            .then(res => {
                setBoardList(res.data.boardList)
                setPageList(res.data.pageList)
                setCurrentPageNumber(res.data.currentPageNumber)
                console.log(res.data)
            })
    }, [])

    function formatDate(date) {
        let result = "";
        for (let i = 0; i < 2; i++) {
            result += date[i]
            result += "-"
        }
        result += date[2] + " "

        for (let i = 3; i < 5; i++) {
            result += date[i]
            result += ":"
        }
        result += date[5]
        return result
    }

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((board) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>{board.title}</td>
                            <td>{board.nickname}</td>
                            <td>{formatDate(board.registerDate)}</td>
                            <td>{board.hit}</td>
                        </tr>
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