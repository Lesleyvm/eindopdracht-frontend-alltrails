import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import './Profile.css'
import {Link} from "react-router-dom";
import heart from '/src/assets/heart-56-1024x1024.png';

function Profile() {
    const [profile, setProfile] = useState({});
    const [profilePicture, setProfilePicture] = useState('');
    const {user} = useContext(AuthContext);

    // zorgt ervoor dat fetchProfile alleen aangeroepen wordt zodra er een token is
    useEffect(() => {
        if (user.token) {
            void fetchProfile();
        }
        // Haalt de opgeslagen afbeeldings-URL op uit localStorage
        const storedProfilePicture = localStorage.getItem('profilePictureUrl');
        if (storedProfilePicture) {
            setProfilePicture(storedProfilePicture);
        }
    }, [user.token]);

    async function fetchProfile() {
        try {

            const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            });

            setProfile(response.data);
            // console.log(response);

        } catch (e) {
            console.error(e);
        }
    }

    async function uploadProfilePicture(base64Image) {
        try {

            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/user/image',
                {base64Image}, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    }
                });

            setProfilePicture(response.data.base64Image)
            // Sla de afbeeldings-URL op in localStorage
            localStorage.setItem('profilePictureUrl', response.data.base64Image);
            console.log(response);

        } catch (e) {
            console.error(e);
        }
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // 'result' bevat de base64-string
                const base64Image = reader.result;

                // Upload de profielfoto naar de server
                uploadProfilePicture(base64Image);
            };

            // Lees het bestand als een Data URL (base64)
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="outer-container">
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="profile-section">
                    {/*nog checken waarom mijn input component niet werkt*/}
                        {profilePicture ?
                            <img src={profilePicture}
                                               alt="Profile"
                                               className="profile-picture"
                            /> :
                            <input type="file"
                                   onChange={handleFileUpload}
                            />
                    }
                    <div className="profile-info">
                        <h2>Welkom {profile.username}!</h2>
                        {/*<p>Date of birth: {profile.info}</p>*/}
                        <p>E-mail: {profile.email}</p>
                        <Link to="/favorites"><p>My favorites</p></Link>
                        <img src={heart}
                             alt=""
                             className="favorite-icon"
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Profile;