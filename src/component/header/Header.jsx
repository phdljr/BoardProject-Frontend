import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../../store/MemberStore";

export default function Header() {
  const { logout, memberData } = useMemberStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" className="py-2 px-2">
      <LinkContainer to="/">
        <Navbar.Brand>SoupBoard</Navbar.Brand>
      </LinkContainer>
      <Nav className="me-auto">
        <LinkContainer to="/">
          <Nav.Link>메인화면</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/board">
          <Nav.Link>게시판</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav className="justify-content-end">
        {memberData.isLogin === true ? (
          <>
            <LinkContainer to="/mypage">
              <Nav.Link>{memberData.nickname}</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </>
        ) : (
          <>
            <LinkContainer to="/login">
              <Nav.Link>로그인</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>회원가입</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
