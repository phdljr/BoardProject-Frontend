import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>SoupBoard</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Main</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/board">
                        <Nav.Link>Board</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
}