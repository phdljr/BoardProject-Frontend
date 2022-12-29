import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [user, setUser] = useState({ email: '', password: '', nickname: '' })
    const navigate = useNavigate();

    function register() {
        axios.post(process.env.REACT_APP_SERVER_HOST + "/register", user)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
    }

    function handleNickname(e) {
        setUser({ ...user, nickname: e.target.value })
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
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Col sm>
                            <Form.Control type="email" placeholder="Email" onChange={handleEmail} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                        </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Col>
                    </Form.Group> */}

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                        <Col sm>
                            <Form.Control type="text" placeholder="Nickname" onChange={handleNickname} />
                        </Col>
                    </Form.Group>
                    <br />

                    <div className="d-grid gap-1">
                        <Button variant="secondary" onClick={register}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}