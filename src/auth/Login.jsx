import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => { // the handleSubmit function will serve to do a POST for our user information
        event.preventDefault();
        fetch('http://localhost:3000/api/user', { // sending a fetch request to the endpoint determined in our server, where we go to signup.
            method: 'POST', // the method of fetch is POST.
            body: JSON.stringify({user:{username: username, password: password}}), // the body is whatever server, backend is expecting
            headers: new Headers({
                'Content-Type': 'application/json' // this lets our server know what type of information we are sending to it.
            })
        }).then(
            (response) => response.json() // we are resolving the promise from fetch
        ).then((data) => {
            props.updateToken(data.sessionToken) // resolving the JSON promise and updateToken
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    {/* created state variables username and password which will be fed from the input fields in our form */}
                    <Label htmlFor="username">Username</Label> 
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} required></Input>
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;