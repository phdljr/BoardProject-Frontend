import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useMemberStore from "../../store/MemberStore";
import { getBoard, dislikeReply, dislikeBoard, likeBoard, likeReply } from "../../api";
import Board from "../../component/Board/Board";

const LOAD_STATUS = { loading: "loading", idle: "idle", error: "error" };

export default function BoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [boardLike, setBoardLike] = useState();
  const [replyList, setReplyList] = useState([]);
  const [replyLikeList, setReplyLikeList] = useState([]);
  const [loadStatus, setLoadStatus] = useState(LOAD_STATUS.loading);

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
      <Card body className="center m-5 shadow">
        데이터 요청중...
      </Card>
    );
  }
  if (loadStatus === LOAD_STATUS.error) {
    return (
      <Card body className="cetner m-5 shadow">
        데이터를 가져오지 못했습니다.
      </Card>
    );
  }

  return (
    <div className="mt-5">
      <Board
        board={board}
        boardLike={boardLike}
        replyLikeList={replyLikeList}
        replyList={replyList}
        onClickLike={handleBoardLike}
        onClickReplyLike={handleReplyLike}
      />
    </div>
  );
}
