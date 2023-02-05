import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useMemberStore from "../store/MemberStore";
import { getBoard, dislikeReply, dislikeBoard, likeBoard, likeReply } from "../api";
import "../style/AlignmentCenter.css";

const LOAD_STATUS = { loading: "loading", idle: "idle", error: "error" };

export default function BoardPage() {
  const { boardId } = useParams();

  const [board, setBoard] = useState();
  const [boardLike, setBoardLike] = useState();
  const [replyList, setReplyList] = useState([]);
  const [replyLikeList, setReplyLikeList] = useState([]);
  const [loadStatus, setLoadStatus] = useState(LOAD_STATUS.loading);

  const navigate = useNavigate();
  const { memberData } = useMemberStore();

  const handleBoardLike = async () => {
    if (!memberData.isLogin) {
      alert("로그인 하신 후 이용해 주시기 바랍니다.");
      return;
    }

    if (boardLike.hasLiked) setBoardLike(await dislikeBoard(boardId, memberData.memberId));
    else setBoardLike(await likeBoard(boardId, memberData.memberId));
  };

  const handleReplyLike = async ({ hasLiked, replyId }) => {
    if (!memberData.isLogin) {
      alert("로그인 하신 후 이용해 주시기 바랍니다.");
      return;
    }

    if (hasLiked) {
      const data = await dislikeReply(replyId, memberData.memberId);
      setReplyLikeList((prev) => {
        const next = [...prev];
        next[next.findIndex((r) => r.replyId === data.replyId)] = data;
        return next;
      });
    } else {
      const data = likeReply(replyId, memberData.memberId);
      setReplyLikeList((prev) => [...prev, data]);
    }
  };

  useEffect(() => {
    setLoadStatus(LOAD_STATUS.loading);
    getBoard(boardId, memberData.memberId)
      .then((data) => {
        setBoard(data.board);
        setBoardLike(data.boardLike);
        setReplyList(data.reply);
        setReplyLikeList(data.replyLike);
        setLoadStatus(LOAD_STATUS.idle);
      })
      .catch(() => setLoadStatus(LOAD_STATUS.error));
  }, [boardId, memberData.memberId]);

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
    <div style={{ padding: "50px 200px 50px 200px" }}>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title as="h1">{board.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <div style={{ float: "left" }}>{board.nickname}</div>
            <div style={{ float: "right" }}>조회수: {board.hit}</div>
          </Card.Subtitle>
          <br />
          <hr />
          <Card.Text style={{ padding: "50px 0px 50px 0px" }}>{board.content}</Card.Text>
          <div style={{ textAlign: "center" }}>
            <Button
              variant={boardLike.hasLiked ? "danger" : "outline-danger"}
              onClick={handleBoardLike}
            >
              👍{boardLike.countLike}
            </Button>
          </div>
          <div>댓글</div>

          {replyList.map((reply, index) => (
            <div key={reply}>
              <hr />
              {reply.nickname}
              <br />
              {reply.content}
              <br />
              <Button
                variant={replyLikeList[index].hasLiked ? "danger" : "outline-danger"}
                style={{ marginTop: "5px" }}
                size="sm"
                onClick={() => handleReplyLike(replyLikeList[index])}
              >
                👍{replyLikeList[index].countLike}
              </Button>
            </div>
          ))}

          <InputGroup className="mb-3" style={{ paddingTop: "20px" }}>
            <Form.Control
              placeholder="댓글을 작성해주세요."
              aria-label="댓글을 작성해주세요."
              aria-describedby="basic-addon2"
              style={{ height: "100px" }}
            />
            <Button variant="primary" id="button-addon2">
              댓글 작성
            </Button>
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={(_e) => {
              navigate("/board");
            }}
          >
            게시판으로
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
