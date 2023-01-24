import { Card } from "react-bootstrap";
import useMemberStore from "../../store/MemberStore";

export default function MyPage() {
  const {
    memberData: { memberId, nickname, memberType },
  } = useMemberStore();
  return (
    <Card className="alignmentCenter">
      <Card.Body>
        id: {memberId}
        <hr />
        nickname: {nickname}
        <hr />
        type: {memberType}
      </Card.Body>
    </Card>
  );
}
