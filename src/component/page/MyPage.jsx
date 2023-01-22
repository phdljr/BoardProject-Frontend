import { Card } from "react-bootstrap";
import useMemberStore from "../../store/MemberStore";

export default function MyPage() {
  const { memberData } = useMemberStore();
  return (
    <Card className="alignmentCenter">
      <Card.Body>
        id: {memberData.memberId}
        <hr />
        nickname: {memberData.nickname}
        <hr />
        type: {memberData.memberType}
      </Card.Body>
    </Card>
  );
}
