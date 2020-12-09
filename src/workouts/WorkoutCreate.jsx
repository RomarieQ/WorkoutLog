import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

    let handleSubmit = (e) => { // the handleSubmit function will serve to do a POST for our user information
        e.preventDefault();
        fetch('http://localhost:3000/api/log/', { // sending a fetch request to the endpoint determined in our server, where we go to signup.
            method: 'POST', // the method of fetch is POST.
            body: JSON.stringify({log:{description: description, definition: definition, result: result}}), // the body is whatever server, backend is expecting
            headers: new Headers({
                'Content-Type': 'application/json', // this lets our server know what type of information we are sending to it.
                'Authorization': props.token
            })
        }).then(
            (res) => res.json() // we are resolving the promise from fetch
        ).then((logData) => {
            console.log(logData);
            setDescription('');
            setDefinition('');
            setResult('');
            props.fetchWorkouts();
        })
    }

    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description"></Label>
                    <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition"></Label>
                    <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result"></Label>
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}></Input>
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
            </Form>
        </>
    )
}

export default WorkoutCreate;