import './App.css'
import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Explore from "./pages/Explore/Explore.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Parkinfo from "./pages/Parkinfo/Parkinfo.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/parkinfo/:parkCode" element={<Parkinfo/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
            </Routes>
        </>
    )
}

export default App
