import './Navigation.css'
import Button from "../Button/Button.jsx";
import logo from '../../assets/alltrails-logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    function handleProfileButtonClick () {
        navigate('/profile');
    }

    return (
        <nav className="navbar-container">
            <span className="logo-wrapper">
                <NavLink to="/">
                <img src={logo} alt="Company Logo"/>
                </NavLink>
            </span>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <NavLink to="/explore" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                        Explore</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/contact" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                        Contact</NavLink>
                </li>
                {isAuth ?
                    <li>
                        <Button
                            text="Log out"
                            clickHandler={logout}
                        />
                    </li>
                    :
                    <li className="navbar-item">
                        <NavLink to="/login">
                            <Button
                                text="Log in"
                            />
                        </NavLink>
                    </li>}
                { isAuth &&
                <li>
                    <Button
                        text="My profile"
                        clickHandler={handleProfileButtonClick}
                    />
                </li>}
            </ul>
        </nav>
    )
}

export default Navigation