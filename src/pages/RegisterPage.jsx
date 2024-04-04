import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          savedAuctions: [],
        }),
      });
      if (res.ok) {
        alert("Account registered!");
        navigate("/"); // navigates home after registration
      } else {
        alert("Something went wrong!");
      }

    } else if (newUsername.length < 6 && newPassword.length < 6) {
      alert("username & password is too short");
    } else if (newUsername.length < 6) {
      alert("username is too short");
    } else if (newUsername.length > 16) {
      alert("username is too long");
    } else if (newPassword.length < 6) {
      alert("password is too short");
    } else if (usernameTaken) {
      alert("username taken")
    }
  }


  useEffect(() => {
    if (newUsername.length < 6) {
      setUsernameWarning("Username too short");
    }
    if (newUsername.length > 6) {
      setUsernameWarning("");
    }
    if (newUsername.length > 16) {
      setUsernameWarning("Username too long");
    }
    checkForExistingAccounts(newUsername)
  }, [newUsername]); // listens to username input to give warning when requierments not met

  useEffect(() => {
    if (newPassword.length < 6) {
      setPasswordWarning("Password too short");
    }
    if (newPassword.length > 6) {
      setPasswordWarning("");
    }
  }, [newPassword]);

  return (<>
    <Form className="register-form">
      <header>Register</header>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <button
        className="material-symbols-outlined"
        onClick={() => navigate("/")}
      >
        arrow_back
      </button>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Example@email.com" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username(6-16 characters)"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value); // uses target value property to update NewUsername value
          }}
        />
        <Form.Text className="text-muted">{usernameWarning}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password (atleast 6 characters long)"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <Form.Text className="text-muted">{passwordWarning}</Form.Text>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" onClick={registerUser}>
        Submit
      </Button>
    </Form>
  </>);
}
