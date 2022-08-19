import { useState } from "react"
import { nanoid } from "nanoid"
import { Navigate } from 'react-router-dom'

export default function Login() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const [newUserInfo, setNewUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        userId: ""
    })


    function handleUserInfo(event) {
        const { name, value } = event.target

        setUserInfo(prevInfo => (
            { ...prevInfo, [name]: value }
        ))
    }

    function handleNewUserInfo(e) {
        const { name, value } = e.target
        setNewUserInfo(prevInfo => (
            { ...prevInfo, [name]: value }
        ))
    }

    async function userLogin(e) {
        e.preventDefault()
        const user = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: userInfo.email,
                password: userInfo.password,
            })
        }
        try {
            const res = await fetch('/login/userLogin', user)
            const data = await res.json()
            sessionStorage.setItem('authUser', data.msg)
            sessionStorage.setItem('userId', data.userId)
            if (data.msg) {
                window.location.reload()
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function registerUser(e) {
        e.preventDefault()
        const newUser = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: newUserInfo.email,
                password: newUserInfo.password,
                firstName: newUserInfo.firstName.toLowerCase(),
                lastName: newUserInfo.lastName.toLowerCase(),
                userId: nanoid()
            })
        }
        setNewUserInfo({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            userId: ""
        })
        try {
            const res = await fetch('/login/newUser', newUser)
            const data = await res.json()
            alert(data.msg)
        } catch (err) {
            console.error(err)
        }
    }


    if (sessionStorage.getItem('authUser') === 'true') {
        return <Navigate to="/user" />
    } else {
        return (
            <div className="loginPageContainer">
                <div className="loginContainer">
                    <h2 className="loginHeading">Sign in</h2>
                    <form className="loginForm">
                        <input
                            value={userInfo.email}
                            type="email"
                            name="email"
                            placeholder="Please Enter Your Email"
                            className="loginInput"
                            id="loginEmailInput"
                            onChange={(event) => handleUserInfo(event)}
                        />
                        <input
                            value={userInfo.password}
                            type="password"
                            name="password"
                            placeholder="Please Enter Your Password"
                            className="loginInput"
                            id="loginPasswordInput"
                            onChange={(event) => handleUserInfo(event)}
                        />
                        <button className="loginInput exerciseBtn" onClick={(e) => userLogin(e)}>Log in</button>
                    </form>
                </div>
                <div className="registerContainer">
                    <h2 className="loginHeading">New User?<br></br>Register Here</h2>
                    <form className="loginForm">
                        <input
                            value={newUserInfo.email}
                            type="email"
                            name="email"
                            placeholder="Please Enter Your Email"
                            className="loginInput"
                            id="registerEmailInput"
                            onChange={(e) => handleNewUserInfo(e)}
                        />
                        <input
                            value={newUserInfo.firstName}
                            type="text"
                            name="firstName"
                            placeholder="Please Enter Your First Name"
                            className="loginInput"
                            id="registerFirstNameInput"
                            onChange={(e) => handleNewUserInfo(e)}
                        />
                        <input
                            value={newUserInfo.lastName}
                            type="text"
                            name="lastName"
                            placeholder="Please Enter Your Last Name"
                            className="loginInput"
                            id="registerLastNameInput"
                            onChange={(e) => handleNewUserInfo(e)}
                        />
                        <input
                            value={newUserInfo.password}
                            type="password"
                            name="password"
                            placeholder="Please Enter Your Password"
                            className="loginInput"
                            id="registerPasswordInput"
                            onChange={(e) => handleNewUserInfo(e)}
                        />
                        <button className="loginInput exerciseBtn" onClick={(e) => registerUser(e)}>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}