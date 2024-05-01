import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyleCard from "../components/StyleCard";
import BackButton from "../components/BackButton";

export default function RegisterPage() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(null);

  const navigate = useNavigate();

  async function checkForExistingAccounts(newUsername) {
    const res = await fetch("api/users")
    const result = await res.json()

    for (let i = 0; i < result.length; i++) {
      let user = result[i]
      if (newUsername === user.username) {
        setUsernameTaken(true)
      } else (setUsernameTaken(false))
    }
  }

  async function registerUser(e) {
    e.preventDefault();

    if (
      // posts user to database if username and password meets requirements
      newUsername.length < 17 &&
      newUsername.length > 5 &&
      newPassword.length > 5 &&
      !usernameTaken
    ) {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword
        }),
      });

      if (res.ok) {
        alert("Account registered!");
        navigate("/"); // navigates home after registration
      } else {
        alert("Something went wrong!");
      }

    } else if (newUsername.length < 6 && newPassword.length < 6) {
      alert("Username & password are too short!");
    } else if (newUsername.length < 6) {
      alert("Username is too short!");
    } else if (newUsername.length > 16) {
      alert("Username is too long!");
    } else if (newPassword.length < 6) {
      alert("Password is too short!");
    } else if (usernameTaken) {
      alert("Username is already taken!")
    }
  }

  useEffect(() => {
    if (newUsername.length < 6) {
      setUsernameWarning("Username is too short!");
    }
    if (newUsername.length > 6) {
      setUsernameWarning("");
    }
    if (newUsername.length > 16) {
      setUsernameWarning("Username is too long!");
    }
    checkForExistingAccounts(newUsername)
  }, [newUsername]); // listens to username input to give warning when requierments not met

  useEffect(() => {
    if (newPassword.length < 6) {
      setPasswordWarning("Password is too short!");
    }
    if (newPassword.length > 6) {
      setPasswordWarning("");
    }
  }, [newPassword]);

  return (
    <>

      <BackButton to="/" />

      <Form className="register-form">
        <StyleCard><h5 className="fst-italic fw-bold d-flex justify-content-center">Register an account.</h5></StyleCard>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <div style={{ height: '20px' }} />


        <StyleCard >
          <div className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="formBasicUsername" style={{ width: '500px' }}>
              <Form.Label className="d-flex justify-content-center">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username (6-16 characters)"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value); // uses target value property to update NewUsername value
                }}
              />
              <Form.Text className="text-muted">{usernameWarning}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '500px' }}>
              <Form.Label className="d-flex justify-content-center">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password (atleast 6 characters long)"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <Form.Text className="text-muted">{passwordWarning}</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={registerUser}>
              Submit
            </Button>
          </div>
        </StyleCard>
      </Form>
    </>);
}
