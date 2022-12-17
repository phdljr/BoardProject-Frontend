import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Footer() {
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed='bottom'>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>SoupBoard</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </>
    )
}