import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "./styles.css"
import { useState } from 'react';

export default function RegisterPage(){

    const [newUsername, setNewUsername] = useState('') 
    const [newPassword, setNewPassword] = useState('') 

    async function registerUser(e){
        e.preventDefault()
        const res = await fetch("api/users",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username" : newUsername,
                "password" : newPassword
            })
        })
       if(res.ok){
        console.log(res)
        alert("Account registered!")
       } else{
        console.log(res)
        alert("Something went wrong!")
       }

    }

    return<>
    
    <Form className='register-form'>
    <header>Register</header> 
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder="Enter username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter safe password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={registerUser}>
        Submit
      </Button>
    </Form>
    </>

}

function registerUser() {

    

}