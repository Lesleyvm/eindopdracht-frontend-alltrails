import './Navigation.css'
function Navigation() {

    return (
        <nav className="navbar-container">
            <ul className="navbar-menu">
                <li className="navbar-item">Explore</li>
                <li className="navbar-item">Contact</li>
                <li className="navbar-item"><button>Log in</button></li>
            </ul>
        </nav>
    )
}

export default Navigation