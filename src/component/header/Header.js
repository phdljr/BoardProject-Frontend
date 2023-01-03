import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';

export default function Header() {

    const { isLogin, logout, memberId, nickname } = useStore(state => state);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <Navbar bg="primary" variant="dark" style={{ padding: "5px 10px 5px 10px" }}>
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
                {isLogin === true
                    ?
                    <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                    :
                    <>
                        <LinkContainer to="/login">
                            <Nav.Link>로그인</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>회원가입</Nav.Link>
                        </LinkContainer>
                    </>
                }
            </Nav>
        </Navbar>
    );
}