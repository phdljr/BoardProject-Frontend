import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { formatDate } from "../../utils";

/**
 * @typedef {{
 *  boardList: {
 *    id: number;
 *    title: string;
 *    nickname: string;
 *    registerDate: string;
 *    hit: number;
 *  }
 * }} BoardListParam
 */

/**
 * @param {BoardListParam} param
 */
function BoardList({ boardList }) {
  return (
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
  );
}

export default BoardList;
