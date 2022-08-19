import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default function Profile() {
    const [workoutList, setWorkoutList] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        const id = sessionStorage.getItem('userId')
        const getMyWorkouts = async () => {
            const myId = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userId: id })
            }
            try {
                const getExs = await fetch('/user', myId)
                const res = await getExs.json()
                setWorkoutList(res)
            } catch (err) {
                console.error(err)
            }
        }
        const getUserData = async () => {
            const myId = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userId: id })
            }
            try {
                const getUser = await fetch('/user/data', myId)
                const res = await getUser.json()
                setCurrentUser(res[0])
            } catch (err) {
                console.error(err)
            }
        }
        getUserData()
        getMyWorkouts()
    }, [])

    async function deleteWorkout(e) {
        const exId = e.target.parentNode.parentNode.id
        const exToDelete = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: exId })
        }
        try {
            const data = await fetch('/user/log/delete', exToDelete)
            const res = await data.json()
            alert(res.msg)
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }

    function workoutToEdit(e) {
        const targetId = e.target.parentNode.parentNode.parentNode.id
        sessionStorage.setItem('editId', targetId)
    }

    if (sessionStorage.getItem('authUser') === 'false' || sessionStorage.getItem('authUser') == null) {
        return <Navigate to="/login" />
    }
    else {
        return (
            <>
                <div className="userProfileHeader">{currentUser && <h1 >Welcome, {currentUser.firstName[0].toUpperCase() + currentUser.firstName.slice(1)}</h1>}<a href='/user/create' className="createNew"><i className="fa-solid fa-circle-plus"></i> Create New Workout</a></div>
                {workoutList.length == 0 && <div className='emptyList'>No workouts to show. Use button above to start logging!</div>}
                <div className='cardContainer'>
                    {workoutList.length > 0 && workoutList.map(workout => {
                        return <ul className='card' id={workout._id} key={workout._id}>
                            <h4 className='cardDate'>Date: {workout.date}</h4>
                            {
                                workout.workout.map(ex => {
                                    return <li className='cardData' key={nanoid()}><span className='cardText'>Exercise:</span> {ex.exercise}<br></br><span className='cardText'>Sets:</span> {ex.sets > 0 ? ex.sets : 'N/A'} | <span className='cardText'>Reps:</span> {ex.reps > 0 ? ex.reps : 'N/A'}</li>
                                })
                            }
                            <div className='cardBtnContainer'>
                                <Link to={'/user/log/edit'} onClick={(e) => workoutToEdit(e)}><button className='exerciseBtn profileBtn'>Edit</button></Link>
                                <button className='exerciseBtn profileBtn' onClick={(e) => deleteWorkout(e)}>Delete</button>
                            </div>
                        </ul>
                    })
                    }
                </div>
            </>
        )
    }
}