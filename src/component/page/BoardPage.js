import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import "../../style/AlignmentCenter.css"

export default function BoardPage() {
    const { boardId } = useParams();
    const [board, setBoard] = useState();
    const [loadData, isLoadData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/board/" + boardId)
            .then(res => {
                isLoadData(true)
                setBoard(res.data)
                console.log(res.data)
            })
            .catch(() => {
                isLoadData(false)
                console.log("실패")
            })
    }, [boardId])

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
            <Card className="alignmentCenter" style={{ width: '80rem' }}>
                <Card.Body>
                    <Card.Title as={"h1"}>{board.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <div style={{ float: "left" }}>{board.nickname}</div>
                        <div style={{ float: "right" }}>조회수: {board.hit}</div>
                    </Card.Subtitle>
                    <br />
                    <hr />
                    <Card.Text>
                        {board.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={(e) => { navigate('/board') }}>메인 화면으로</Button>
                </Card.Footer>
            </Card>
            {/* <h1>{board.title}</h1>
            <br></br>
            <div className="alignmentCenter">
                <p>id: {board.id}</p>
                <p>title: {board.title}</p>
                <p>nickname: {board.nickname}</p>
                <p>content: {board.content}</p>
                <p>hit: {board.hit}</p>
            </div> */}
        </>
    )
}