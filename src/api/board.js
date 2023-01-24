import axios from "./axios";

async function _getReplyLike(boardId, memberId) {
  const res = await axios.get(`/reply-like/${boardId}/${memberId}`);
  return res.data;
}

async function _getReply(boardId) {
  const res = await axios.get(`/reply/${boardId}`);
  return res.data;
}

async function _getBoardLike(boardId, memberId) {
  const res = await axios.get(`/board-like/${boardId}/${memberId}`);
  return res.data;
}

async function _getBoardOne(boardId) {
  const res = await axios.get(`/board/${boardId}`);
  return res.data;
}

/**
 *
 * @param {number} boardId
 * @param {number} memberId
 * @returns
 */
const getBoard = async (boardId, memberId) => {
  const result = {
    board: await _getBoardOne(boardId),
    boardLike: await _getBoardLike(boardId, memberId),
    reply: await _getReply(boardId),
    replyLike: await _getReplyLike(boardId, memberId),
  };

  return result;
};

/**
 *
 * @param {number} currentPageNumber
 * @returns
 */
const getBoardList = async (currentPageNumber) => {
  const { data } = await axios.get(`/board?page=${currentPageNumber}`);

  return data;
};

/**
 *
 * @param {number} boardId
 * @param {number} memberId
 */
const likeBoard = async (boardId, memberId) => {
  const { data } = await axios.post(`/board-like`, {
    memberId,
    boardId,
  });
  return data;
};

/**
 *
 * @param {number} boardId
 * @param {number} memberId
 */
const dislikeBoard = async (boardId, memberId) => {
  const { data } = await axios.delete(`/board-like/${boardId}/${memberId}`);
  return data;
};

export { getBoard, getBoardList, likeBoard, dislikeBoard };
