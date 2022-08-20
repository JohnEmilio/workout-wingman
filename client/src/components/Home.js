import { Link } from "react-router-dom"
import background from "../assets/images/main-background.jpg"
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        const getHome = async () => {
            try {
                const data = fetch('/')
                const res = res.json()
                console.log(res)
            } catch (err) {
                console.error(err)
            }
        }
        getHome()
    })

    return (
        <div className="wrapper">
            <div className="welcome welcomeBg" id="welcomeBg">
                <img src={background} className="welcomeBackground" />
                <div className="welcomeMsg">
                    <h1 className="welcomeHeading">Workout Wingman</h1>
                    <span className="welcomeSubheading">Build a better workout!</span>
                </div>
            </div>
            <main className="mainSection">
                <div className="mainContainer">
                    <h2 className="mainHeading">Build a better workout today!</h2>
                    <p className="mainIntro">Looking for an easier way to keep a log of your exercises? The days of using a pen and notepad are over! <span className="logo">Workout Wingman</span> allows users to search, add, and edit exercises which they can put into a daily log. With a database with over 1300 exercises, Workout Wingman has you covered! <br /><br /> Already a member or want to join? Click <span className="logo"><Link to={"/login"}>here</Link></span>!
                    </p>
                </div>
            </main>
        </div>

    )
}