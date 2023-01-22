import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/AlignmentCenter.css";

export default function RegisterPage() {
  const [user, setUser] = useState({ email: "", password: "", nickname: "" });
  const navigate = useNavigate();

  const register = () => {
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/register`, user).then(() => {
      navigate("/");
    });
  };

  const handleNickname = (e) => {
    setUser({ ...user, nickname: e.target.value });
  };

  const handleEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <div className="alignmentCenter largePaggind shadow">
      <Container className="panel">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Col sm="auto">
              <Form.Control type="email" placeholder="Email" onChange={handleEmail} />
            </Col>
            <Col sm="auto">
              <Button>중복 확인</Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm="auto">
              <Form.Control type="text" placeholder="닉네임" onChange={handleNickname} />
            </Col>
            <Col sm="auto">
              <Button>중복 확인</Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm>
              <Form.Control type="password" placeholder="비밀번호" onChange={handlePassword} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswordValidation">
            <Col sm>
              <Form.Control type="password" placeholder="비밀번호 확인" />
            </Col>
          </Form.Group>

          <br />

          <div className="d-grid gap-1">
            <Button variant="primary" onClick={register}>
              회원가입
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
