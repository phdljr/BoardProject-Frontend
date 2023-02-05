import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AlignmentCenter.css";
import useMemberStore from "../store/MemberStore";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useMemberStore();

  const handleLogin = async () => {
    await login(user);
    navigate("/");
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
          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Control type="text" placeholder="Email" onChange={handleEmail} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm>
              <Form.Control type="password" placeholder="비밀번호" onChange={handlePassword} />
            </Col>
          </Form.Group>
          <br />

          <div className="d-grid gap-1">
            <Button variant="primary" onClick={handleLogin}>
              로그인
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
