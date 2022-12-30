import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Footer() {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" style={{ padding: "5px 10px 5px 10px" }}>
            <LinkContainer to="/">
                <Navbar.Brand>SoupBoard</Navbar.Brand>
            </LinkContainer>
        </Navbar>
    )
}