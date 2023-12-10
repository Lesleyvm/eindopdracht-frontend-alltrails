import './Signup.css';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/alltrails-logo.png";
import InputFields from "../../components/Input/InputFields.jsx";
import Button from "../../components/Button/Button.jsx";
import axios from "axios";
import {useState} from "react";
import Notifications from "../../components/Notifications/Notifications.jsx";

function Signup() {
    const [notification, setNotification] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        const formData = {
            username: data['username-field'],
            email: data['email-field'],
            password: data['password-field'],
            role: ['user']
        }

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", formData);
            console.log(response);
            console.log("Account is succesvol aangemaakt!")

            setNotification({ type: "success", message: "Account successfully created!" });
            // timer ingesteld voor message voordat gebruiker doorgestuurd wordt
            setTimeout(() => {
                navigate('/login');
            }, 2000);


        } catch (e) {
            console.error(e.response);

            if (e.response && e.response.status === 400 && e.response.data && e.response.data.message === "This username is already in use") {

                setNotification({ type: "error", message: "Username already in use. Please choose a different username." });

            } else {
                setNotification({ type: "error", message: "Oops! Something went wrong. Please try again." });
            }
        }
    }


    return (
        <div id="signup" className="outer-container">

            <span className="logo-wrapper secondary-logo">
                <Link to="/">
                <img src={logo} alt="Company Logo"/>
                </Link>
            </span>

            <div className="inner-container signup-section">
                <h2>Start your adventure right here.</h2>

                {notification && (
                    <Notifications
                        type={notification.type}
                        message={notification.message}
                        onClose={() => setNotification(null)}
                    />
                )}

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

                    {/*notitie maken van automatische e-mail validatie React*/}
                    <InputFields
                        label="E-mail"
                        type="email"
                        name="email-field"
                        id="email-field"
                        register={register}
                        validationRules={{
                            required: {
                                value: true,
                                message: 'This field is required',
                            }
                        }}
                            errors={errors}
                            />
                            <InputFields
                            label="Password"
                            type="text"
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
                            text="Create account"
                            buttonType="submit"
                        />
                    </div>
                </form>
                <Link to="/contact"><h4>Help</h4></Link>
            </div>
        </div>
    )
}

export default Signup;