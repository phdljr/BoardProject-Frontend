import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    function login() {
        axios.post(process.env.REACT_APP_SERVER_HOST + "/login", user)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
    }

    function handleEmail(e) {
        setUser({ ...user, email: e.target.value })
    }

    function handlePassword(e) {
        setUser({ ...user, password: e.target.value })
    }

    return (
        <div style={{ padding: "50px" }}>
            <Container className="panel">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                        <Col sm>
                            <Form.Control type="text" placeholder="Email" onChange={handleEmail} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                        </Col>
                    </Form.Group>
                    <br />

                    <div className="d-grid gap-1">
                        <Button variant="secondary" onClick={login} >
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}