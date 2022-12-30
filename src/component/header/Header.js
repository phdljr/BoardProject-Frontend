import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>SoupBoard</Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <LinkContainer to="/">
                        <Nav.Link>메인화면</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Nav.Link>게시판</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link>로그인</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <Nav.Link>회원가입</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
}