import Footer from "../../components/Footer/Footer.jsx";
import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/alltrails-logo.png";

function Contact() {
    return (
        <>
            <span className="logo-wrapper">
                <Link to="/">
                <img src={logo} alt="Company Logo"/>
                </Link>
            </span>
            <Footer/>
        </>
    )
}

export default Contact;