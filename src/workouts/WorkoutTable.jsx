import React from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable = (props) => {


    const deleteWorkout = (workout) => {
        fetch(`http://localhost:3000/api/log/${workout.id}`, { // sending a fetch request to the endpoint determined in our server, where we go to signup.
            method: 'DELETE', // the method of fetch is DELETE.
            headers: new Headers({
                'Content-Type': 'application/json', // this lets our server know what type of information we are sending to it.
                'Authorization': props.token
            })
        })
        .then(() => props.fetchWorkouts()) // resolving the JSON promise and updateToken
        }


    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        <Button color="warning">Update</Button>
                        <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
            <h>Workout History</h>
            <hr></hr>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Result</th>
                        <th>Description</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </>
    )
}

export default WorkoutTable;