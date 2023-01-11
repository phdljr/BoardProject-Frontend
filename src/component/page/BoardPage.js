import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useMemberStore from "../../store/MemberStore";
import "../../style/AlignmentCenter.css"

export default function BoardPage() {
    const { boardId } = useParams();

    const [board, setBoard] = useState();
    const [boardLike, setBoardLike] = useState();
    const [replyList, setReplyList] = useState([]);
    const [replyLikeList, setReplyLikeList] = useState([]);
    const [loadData, isLoadData] = useState(null);

    const navigate = useNavigate();
    const { memberData } = useMemberStore();

    useEffect(() => {
        callData();
    }, []);

    function callData() {
        getBoard();
    }

    function getBoard() {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/board/" + boardId)
            .then(res => {
                setBoard(res.data);
                getBoardLike();
            })
            .catch(() => {
                isLoadData(false)
                console.log("게시글 실패");
            });
    }

    function getBoardLike() {
        axios.get(process.env.REACT_APP_SERVER_HOST + `/board-like/${boardId}/${memberData.memberId}`)
            .then(res => {
                setBoardLike(res.data);
                getReply();
            })
            .catch(() => {
                isLoadData(false)
                console.log("게시글 좋아요 실패");
            });
    }

    function getReply() {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/reply/" + boardId)
            .then(res => {
                setReplyList(res.data);
                getReplyLike();
            })
            .catch(() => {
                isLoadData(false)
                console.log("댓글 실패");
            });
    }

    function getReplyLike() {
        axios.get(process.env.REACT_APP_SERVER_HOST + `/reply-like/${boardId}/${memberData.memberId}`)
            .then(res => {
                setReplyLikeList(res.data);
                isLoadData(true);
            })
            .catch((err) => {
                isLoadData(false);
                console.log("댓글 좋아요 실패");
            });
    }

    function handleBoardLike() {
        if (!memberData.isLogin) {
            alert("로그인 하신 후 이용해 주시기 바랍니다.");
            return;
        }

        const data = {
            memberId: memberData.memberId,
            boardId: boardId
        };

        if (boardLike.hasLiked) {
            axios.delete(process.env.REACT_APP_SERVER_HOST + `/board-like/${boardId}/${memberData.memberId}`)
                .then(res => {
                    setBoardLike(res.data);
                })
                .catch(err => {
                    alert("게시판 좋아요 해제 실패");
                })
        }
        else {
            axios.post(process.env.REACT_APP_SERVER_HOST + "/board-like", data)
                .then(res => {
                    setBoardLike(res.data);
                })
                .catch(err => {
                    alert("게시판 좋아요 설정 실패");
                })
        }
    }

    function handleReplyLike(reply) {
        if (!memberData.isLogin) {
            alert("로그인 하신 후 이용해 주시기 바랍니다.");
            return;
        }

        const data = {
            memberId: memberData.memberId,
            replyId: reply.replyId
        };

        if (reply.hasLiked) {
            axios.delete(process.env.REACT_APP_SERVER_HOST + `/reply-like/${reply.replyId}/${memberData.memberId}`)
                .then(res => {
                    let temp = [...replyLikeList];
                    temp[replyLikeList.findIndex(r => r.replyId === res.data.replyId)] = res.data;
                    setReplyLikeList(temp);
                })
                .catch(err => {
                    alert("댓글 좋아요 해제 실패");
                })
        }
        else {
            axios.post(process.env.REACT_APP_SERVER_HOST + "/reply-like", data)
                .then(res => {
                    let temp = [...replyLikeList];
                    temp[replyLikeList.findIndex(r => r.replyId === res.data.replyId)] = res.data;
                    setReplyLikeList(temp);
                })
                .catch(err => {
                    alert("댓글 좋아요 설정 실패");
                })
        }
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
        <div style={{ padding: '50px 200px 50px 200px' }}>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title as={"h1"}>{board.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <div style={{ float: "left" }}>{board.nickname}</div>
                        <div style={{ float: "right" }}>조회수: {board.hit}</div>
                    </Card.Subtitle>
                    <br />
                    <hr />
                    <Card.Text style={{ padding: "50px 0px 50px 0px" }}>
                        {board.content}
                    </Card.Text>
                    <div style={{ textAlign: "center" }}>
                        <Button variant={boardLike.hasLiked ? "danger" : "outline-danger"} onClick={handleBoardLike}>👍{boardLike.countLike}</Button>
                    </div>
                    <div>댓글</div>

                    {replyList.map((reply, index) => (
                        <div key={index}>
                            <hr />
                            {reply.nickname}<br />
                            {reply.content}<br />
                            <Button variant={replyLikeList[index].hasLiked ? "danger" : "outline-danger"} style={{ marginTop: "5px" }} size="sm" onClick={() => handleReplyLike(replyLikeList[index])}>👍{replyLikeList[index].countLike}</Button>
                        </div>
                    ))}

                    <InputGroup className="mb-3" style={{ paddingTop: "20px" }}>
                        <Form.Control
                            placeholder="댓글을 작성해주세요."
                            aria-label="댓글을 작성해주세요."
                            aria-describedby="basic-addon2"
                            style={{ height: '100px' }}
                        />
                        <Button variant="primary" id="button-addon2">
                            댓글 작성
                        </Button>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={(e) => { navigate('/board') }}>게시판으로</Button>
                </Card.Footer>
            </Card>
        </div >
    )
}