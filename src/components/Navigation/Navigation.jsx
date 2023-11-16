import './Navigation.css'
import Button from "../Button/Button.jsx";
import logo from '../../assets/alltrails-logo.png';
import {NavLink} from "react-router-dom";

function Navigation() {

    return (
        <nav className="navbar-container">
            <span className="logo-wrapper">
                <NavLink to="/">
                <img src={logo} alt="Company Logo"/>
                </NavLink>
            </span>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <NavLink to="/explore" className={({ isActive}) => isActive ? 'active-link' : 'default-link'}>
                        Explore</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/contact" className={({ isActive}) => isActive ? 'active-link' : 'default-link'}>
                        Contact</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/login">
                    <Button
                        text="Log in"
                    />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation