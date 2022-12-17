import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <>
            <h2 style={{ textAlign: "center" }}>
                <div>잘못된 접근입니다.</div>
                <Link to="/">돌아가기</Link>
            </h2>

        </>
    )
}