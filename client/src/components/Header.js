import NavMenu from "./Menu"


export default function Header() {


    return (
        <header>
            <nav className="nav" id="navbar">
                <div className="navHeadingContainer">
                    <h1 className="navHeading">Workout Wingman</h1>
                    <span className="navHeadingPhrase">Build a better workout!</span>
                </div>
                <NavMenu />
            </nav>
        </header>
    )
}
