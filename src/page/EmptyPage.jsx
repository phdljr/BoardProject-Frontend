import { Link } from "react-router-dom";
import "../style/AlignmentCenter.css";

export default function EmptyPage() {
  return (
    <div className="alignmentCenter koreanFont">
      <h2>
        <div>잘못된 접근입니다.</div>
        <Link to="/">돌아가기</Link>
      </h2>
    </div>
  );
}
