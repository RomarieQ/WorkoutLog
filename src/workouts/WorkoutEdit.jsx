import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';

const WorkoutEdit = (props) => {

    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutToUpdate = () => {
        fetch(`http://localhost:3000/api/log/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            setWorkouts(logData)
            console.log(logData);
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="result">Edit Result:</Label>
                        <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition">Edit Definition:</Label>
                        <Input name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                        <option></option>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update the workout</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;