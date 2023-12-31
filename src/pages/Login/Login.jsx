import logo from '../../assets/alltrails-logo.png'
import './Login.css'
import Button from "../../components/Button/Button.jsx";
import {Link} from "react-router-dom";
import InputFields from "../../components/Input/InputFields.jsx";
import {useForm} from 'react-hook-form';
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Notifications from "../../components/Notifications/Notifications.jsx";

function Login() {
    const [notification, setNotification] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);

    async function handleFormSubmit(data) {
        const formData = {
            username: data['username-field'],
            password: data['password-field'],
        }

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", formData);
            login(response.data.accessToken);

        } catch (e) {
            console.error(e);

            setNotification({
                type: "error",
                message: "Please use a valid username or password.",
            });
        }
    }

    return (
        <div id="login" className="outer-container">
            <span className="logo-wrapper secondary-logo">
                <Link to="/">
                <img src={logo} alt="Company Logo"/>
                </Link>
            </span>

            {notification && (
                <Notifications
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="inner-container login-section">
                <h2>Welcome back adventurer.</h2>
                <h2>Log in and start exploring.</h2>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputFields
                        label="Username"
                        type="text"
                        name="username-field"
                        id="username-field"
                        register={register}
                        validationRules={{
                            required: {
                                value: true,
                                message: 'This field is required',
                            },
                            minLength: {
                                value: 6,
                                message: 'Username must have 6 characters'
                            },
                        }}
                        errors={errors}
                    />
                    <InputFields
                        label="Password"
                        type="password"
                        name="password-field"
                        id="password-field"
                        register={register}
                        validationRules={{
                            required: {
                                value: true,
                                message: 'This field is required',
                            },
                            minLength: {
                                value: 6,
                                message: 'Password must have 6 characters'
                            },
                        }}
                        errors={errors}
                    />

                    <div className="button-wrapper">
                        <Button
                            text="Log in"
                            buttonType="submit"
                        />
                    </div>
                </form>

                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="no-account">Don't have an account yet? Click <Link to="/signup">here</Link> to register.
                </p>
                <Link to="/contact"><h4>Help</h4></Link>
            </div>

        </div>
    )
}

export default Login;