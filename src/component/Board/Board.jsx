import { Card, Button, Form, InputGroup } from "react-bootstrap";

/**
 * @typedef {{
 *    hasLiked: boolean;
 *    countLike: number;
 *  }} ReplyLike
 */
/**
 * @typedef {{
 *  board: {
 *    id: number;
 *    title: string;
 *    nickname: string;
 *    registerDate: string;
 *    hit: number;
 *  },
 *  boardLike: {
 *    hasLiked: boolean;
 *    countLike: number;
 *  },
 *  replyList: {
 *    nickname: string;
 *    content: string;
 *  }[],
 *  replyLikeList: ReplyLike[],
 *  onClickLike: () => void,
 *  onClickReplyLike: (replyLike:ReplyLike) => void,
 * }} BoardProps
 */

/**
 * @param {BoardProps} prop
 */
function Board({ board, boardLike, replyList, replyLikeList, onClickLike, onClickReplyLike }) {
  return (
    <Card className="w-100">
      <Card.Body>
        <Card.Title as="h1">{board.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <div className="float-start">{board.nickname}</div>
          <div className="float-end">조회수: {board.hit}</div>
        </Card.Subtitle>
        <br />
        <hr />
        <Card.Text className="py-3">{board.content}</Card.Text>
        <div className="text-center">
          <Button variant={boardLike.hasLiked ? "danger" : "outline-danger"} onClick={onClickLike}>
            👍{boardLike.countLike}
          </Button>
        </div>

        <hr />
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
              className="mt-1"
              size="sm"
              onClick={() => onClickReplyLike(replyLikeList[index])}
            >
              👍{replyLikeList[index].countLike}
            </Button>
          </div>
        ))}

        <InputGroup className="mb-3 pt-3">
          <Form.Control
            placeholder="댓글을 작성해주세요."
            aria-label="댓글을 작성해주세요."
            aria-describedby="basic-addon2"
            style={{ height: "60px" }}
          />
          <Button variant="primary" id="button-addon2">
            댓글 작성
          </Button>
        </InputGroup>
      </Card.Body>
      <Card.Footer>
        <Button>게시판으로</Button>
      </Card.Footer>
    </Card>
  );
}

export default Board;
