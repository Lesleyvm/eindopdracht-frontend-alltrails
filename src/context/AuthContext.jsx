import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({})
function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status:'pending'
    });

    // useffect zorgt ervoor dat er niet opnieuw gemount wordt bij refresh
    useEffect(() => {
        const token = localStorage.getItem('token')
        // is er een token Is deze nog geldig?

        if(token) {
        // Zo ja? Haal informatie opnieuw op
           void login(token);
        } else {
        toggleIsAuth({
            ...isAuth,
            status: 'done'
        });
        }

    }, []);

    const navigate = useNavigate();

    async function login(token) {
        // hiermee sla ik de ontvangen token op in de LS
        localStorage.setItem('token', token);

        //  hiermee decodeer ik de informatie uit de token
        const userinfo = jwtDecode(token);
        console.log(userinfo);
        // const userId = userinfo.sub; // hier snap ik het punt even niet meer van?

        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    // token stuur ik mee om aan te tonen dat ik de gebruiker ben
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);

            toggleIsAuth({
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id
                },
                status: 'done',
            });

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                ...isAuth,
                status: 'done'
            })
        }

        navigate('/profile');
        console.log("Gebruiker is ingelogd!");
    }

    function logout() {
        //  hiermee verwijder ik het token uit de LS
        localStorage.removeItem('token');

        // hiermee verwijder ik alle gegevens van de gebruiker
        toggleIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done'
        });

        navigate('/');
        console.log("Gebruiker is uitgelogd!");
    }

    const data = {
        isAuth: isAuth.isAuthenticated,
        user: isAuth.user,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading..</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;