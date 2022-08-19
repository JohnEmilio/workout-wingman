import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Navigate } from 'react-router-dom'


export default function Exercises() {
  const [exercises, setExercises] = useState([])
  const [exerciseTarget, setExerciseTarget] = useState({
    targetMuscle: "",
    equipment: ""
  })
  const [currentWorkoutList, setCurrentWorkoutList] = useState([])
  const muscleTargetArr = ['Back', 'Cardio', 'Chest', 'Lower arms', 'Lower legs', 'Neck', 'Shoulders', 'Upper arms', 'Upper legs', 'Waist']

  useEffect(() => {

    const fetchExericseData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': "0d9f2bfba9msh301dcef72f9f8c6p106322jsn86af5eeabee8",
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      try {
        if (!localStorage.getItem("exercises")) {
          console.log("fetching api data")
          const exData = await fetch('https://exercisedb.p.rapidapi.com/exercises', options)
          const res = await exData.json()
          localStorage.setItem("exercises", JSON.stringify([...res]));
        }
        setExercises(JSON.parse(localStorage.getItem("exercises")));
      } catch (err) {
        console.error(err)
      }
    }
    fetchExericseData()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target

    setExerciseTarget(prevTarget => ({
      ...prevTarget,
      [name]: value
    }))
  }

  function toggleGif(e) {
    // event.target.parentElement.lastChild This is for when buttons are in main li
    e.target.parentElement.nextSibling.firstChild.toggleAttribute("hidden")
  }

  function addToWorkout(e) {
    // event.target.parentElement.childNodes[0].data This is when the buttons are in the main li

    const exerciseName = e.target.parentElement.parentElement.firstChild.data

    setCurrentWorkoutList(prevList => [...prevList, { exercise: exerciseName, id: nanoid(), sets: 0, reps: 0 }])

  }

  function changeSetAndReps(e) {
    const val = e.target.value
    const name = e.target.name
    const parentId = e.target.parentNode.id
    setCurrentWorkoutList(prevList => {
      return prevList.map(ex => {
        if (ex.id === parentId) {
          return { ...ex, [name]: val }
        }
        else return ex
      })
    })
  }

  function removeFromList(e, exerciseId) {
    setCurrentWorkoutList(prevList =>
      prevList.filter(exercise => exercise.id !== exerciseId))
  }

  async function logCurrentList() {
    const year = new Date().getUTCFullYear()
    const month = new Date().getUTCMonth() + 1
    const day = new Date().getUTCDate()
    const date = `${year}-${month < 10 ? `0${month}` : month}-${day}`

    const workout = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        workout: currentWorkoutList,
        date: date,
        userId: sessionStorage.getItem("userId")
      })
    }
    try {
      const data = await fetch('/user/create/add', workout)
      const res = await data.json()
      setCurrentWorkoutList([])
      alert(res.msg)
    } catch (err) {
      console.error(err)
    }
  }


  if (sessionStorage.getItem('authUser') === 'false' || sessionStorage.getItem('authUser') == null) {
    return <Navigate to="/login" />
  }
  else {
    return (
      <section className="exerciseContainer">
        <div className="exerciseDisplay">
          <div className="inputContainer">
            <h3>Use the selections below to search for exercises</h3>
            <select
              id="targetMuscle"
              value={exerciseTarget.targetMuscle}
              onChange={handleChange}
              name="targetMuscle"
            >
              <option value="">Select One</option>
              {muscleTargetArr.map(muscle => <option key={nanoid()} value={muscle}>{muscle}</option>)}
            </select>

            <select
              id="equipment"
              value={exerciseTarget.equipment}
              onChange={handleChange}
              name="equipment"
            >
              <option value="">Select One</option>
              <option value="assisted">Assisted</option>
              <option value="band">Band</option>
              <option value="barbell">Barbell</option>
              <option value="body weight">Body weight</option>
              <option value="bosu ball">Bosu ball</option>
              <option value="cable">Cable</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="elliptical machine">Elliptical machine</option>
              <option value="ez barbell">Ez barbell</option>
              <option value="hammer">Hammer</option>
              <option value="kettlebell">Kettlebell</option>
              <option value="leverage machine">Leverage machine</option>
              <option value="medicine ball">Medicine ball</option>
              <option value="olympic barbell">Olympic barbell</option>
              <option value="resistance band">Resistance band</option>
              <option value="roller">Roller</option>
              <option value="rope">Rope</option>
              <option value="skierg machine">Skierg machine</option>
              <option value="sled machine">Sled machine</option>
              <option value="smith machine">Smith machine</option>
              <option value="stability ball">Stability ball</option>
              <option value="stationary bike">Stationary bike</option>
              <option value="stepmill machine">Stepmill machine</option>
              <option value="tire">Tire</option>
              <option value="trap bar">Trap bar</option>
              <option value="upper body ergometer">Upper body ergometer</option>
              <option value="weighted">Weighted</option>
              <option value="wheel roller">Wheel roller</option>
            </select>
          </div>
          <ul className="exerciseData">
            {(exerciseTarget.targetMuscle && exerciseTarget.equipment) && exercises.filter(exercise => exercise.bodyPart === exerciseTarget.targetMuscle.toLowerCase() && exercise.equipment === exerciseTarget.equipment).map((exercise, ind) => {
              return <li className="searchList exercisesList" key={ind}>
                {exercise.name.toUpperCase()}
                <div className="exerciseListBtnContainer">
                  <button className="exerciseBtn addToList" onClick={(event) => addToWorkout(event)}>Add to Workout</button>
                  <button className="exerciseBtn toggleGif" onClick={(event) => toggleGif(event)}>View Example</button>
                </div>
                <div className="gifContainer">
                  <img id="exerciseGif" src={exercise.gifUrl} alt={exercise.name} hidden />
                </div>
              </li>
            })
            }
          </ul>
        </div>
        <div id="todaysExercises" className="listContainer">
          {currentWorkoutList.length > 0 && <h2 className="todayHeader">Today's Workout:</h2>}
          <ul id="todaysExerciseList">
            {currentWorkoutList.map(exercise => {
              return <li key={exercise.id} id={exercise.id} className="currentExercises exercisesList">
                {exercise.exercise}

                <br></br>

                <input
                  className="exNumInput"
                  type="number"
                  id="numOfSets"
                  name="sets"
                  onChange={(e) => changeSetAndReps(e)}
                />
                <label htmlFor="sets"># of Sets</label>

                <br></br>

                <input
                  className="exNumInput"
                  type="number"
                  id="numOfReps"
                  name="reps"
                  onChange={(e) => changeSetAndReps(e)}
                />
                <label htmlFor="reps"># of Reps</label>

                <br></br>

                <button className="removeBtn exerciseBtn" onClick={(event) => removeFromList(event, exercise.id)}>Remove</button>
              </li>
            })}
          </ul>
          <div>
            {currentWorkoutList.length > 0 && <button className="exerciseBtn logBtn" onClick={logCurrentList}>Log list</button>}
            {currentWorkoutList.length > 0 && <button className="exerciseBtn logBtn" onClick={() => setCurrentWorkoutList([])}>Clear list</button>}
          </div>
        </div>
      </section>
    )
  }
}