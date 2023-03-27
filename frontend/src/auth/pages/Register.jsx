import { useForm } from "../../hooks/useForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const signUpFormFields = {
  userName:"",
  email: "",
  password: "",
};


export const Register = () => {
  
  const { errorMessage, startRegister  } = useAuthStore();
  const {userName, email, password, onInputChange } = useForm(signUpFormFields);

  const signUpSubmit = (event) => {
    event.preventDefault();
    startRegister({ name: userName, email: email, password: password });
   
  };

  useEffect(() => {
   if (errorMessage !== undefined) {
    Swal.fire('Error', errorMessage, 'error');
   }
  }, [errorMessage])
  
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          sm={6}
          style={{
            width: 512,
            height: 629,
            marginTop: "5rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: "1rem",
          }}
        >
          <Form onSubmit={signUpSubmit}>
            <h1
              style={{
                marginTop: "3rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Sign Up
            </h1>
            <div className="mb-2">
              <h6 style={{ marginLeft: "2rem" }}> Name </h6>
              <Form.Control
                style={{height: "4rem", width: "90%", margin: "auto" }}
                type="name"
                name="userName"
                value={userName}
                onChange={ onInputChange }
                required
              />
            </div>
            <div className="mb-2">
              <h6 style={{ marginLeft: "2rem" }}> Email </h6>
              <Form.Control
                style={{ height: "4rem",width: "90%", margin: "auto" }}
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="example@gmail.com"
                required
              />
              
            </div>
            <div className="mb-2">
              <h6 style={{ marginLeft: "2rem" }}>Password</h6>
              <Form.Control
                style={{ height: "4rem",width: "90%", margin: "auto" }}
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Password"
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                className="mt-4 mb-5"
                style={{ width: "15rem", height: "3rem", borderRadius: "3rem", backgroundColor: "#6c63ff" }}
              >
                Sign Up
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="link" href="login">
                Already got an account?
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
