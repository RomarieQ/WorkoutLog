import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {

    const [workouts, setWorkouts] = useState([]); // will return an array
    const [updateActive, setUpdateActive] = useState(false); // will be used to conditionally display our WorkoutEdit component (will be true if 'update' button clicked)
    const [workoutToUpdate, setWorkoutToUpdate] = useState([]);

    const fetchWorkouts = () => {
        fetch('http://localhost:3000/api/log', {
            method: 'GET',
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

    const editUpdateWorkout = (workout) => { // this will update our workoutToUpdate state variable based upon the input to this function
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])

    return(
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token}></WorkoutCreate>
                </Col>
                <Col md="9">
                    <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout} updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token}></WorkoutTable>
                </Col>
                {/* the updateActive will show if our WorkoutEdit component should be displaying or not */}
                {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate}
                updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts}></WorkoutEdit> : <></>}
            </Row>
        </Container>
    )
}

export default WorkoutIndex;