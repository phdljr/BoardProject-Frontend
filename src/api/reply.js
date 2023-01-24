import axios from "./axios";

/**
 *
 * @param {number} replyId
 * @param {number} memberId
 */
const likeReply = async (replyId, memberId) => {
  const { data } = await axios.post(`/reply-like`, {
    memberId,
    replyId,
  });
  return data;
};

/**
 *
 * @param {number} replyId
 * @param {number} memberId
 */
const dislikeReply = async (replyId, memberId) => {
  const { data } = await axios.delete(`/reply-like/${replyId}/${memberId}`);
  return data;
};

export { likeReply, dislikeReply };
