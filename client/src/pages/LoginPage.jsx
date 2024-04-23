import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const { login, loggedIn } = useContext(GlobalContext);
  const { displayAlert } = useContext(GlobalContext);
  const { showLogoutAlert } = useContext(GlobalContext);
  // const { setSocket } = useContext(GlobalContext)

  // setSocket(null)



  const checkForUser = async (e) => {
    e.preventDefault();

    const userData = {
      username: usernameInput,
      password: passwordInput,
    };

    const loginResponse = await login(userData);

    // console.log(loginResponse)
    if (loginResponse.status === 201) {
      navigate("/");
    } else {
      // felhantering saknas
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const response = await fetch("/api/login");
      if (response.status === 200) {
        navigate("/");
      } 
    };

    getSession();
  }, []);

  return (
    <>
      <Form className="register-form">
        <header>Login Page</header>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter username"
            value={usernameInput} // The value that is submitted
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter safe password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

        <Button variant="primary" onClick={checkForUser}>
          Login
        </Button>

        <div>{error}</div>
        <div>
          <b>OR</b>
        </div>

        <Button>
          <Link className="register-link" to="/registerPage">
            Register!
          </Link>
        </Button>
        {showLogoutAlert ? (
          <Alert className="logout-alert" severity="info">
            <em>Goodbye, you are now logged out!</em>
          </Alert>
        ) : (
          ""
        )}
      </Form>
    </>
  );
}
