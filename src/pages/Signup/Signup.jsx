import './Signup.css';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/alltrails-logo.png";
import InputFields from "../../components/Input/InputFields.jsx";
import Button from "../../components/Button/Button.jsx";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Signup() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    async function handleFormSubmit(data) {
        const formData = {
            username: data['username-field'],
            email: data['email-field'],
            password: data['password-field'],
            info: data['date-of-birth-field'],
            role: ['user']
        }

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", formData);
            console.log(response);
            console.log("Account is succesvol aangemaakt!")

            // hiermee logt de gebruiker in na succesvolle registratie
            // werkt niet, nog naar kijken
            login(response.data.accessToken);

            navigate('/profile');


        } catch (e) {
            console.error(e.response);
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

                    {/*werkt niet, nog naar kijken*/}
                    {/*<InputFields*/}
                    {/*    label="Date of birth"*/}
                    {/*    type="text"*/}
                    {/*    name="date-of-birth-field"*/}
                    {/*    id="date-of-birth-field"*/}
                    {/*    register={register}*/}
                    {/*    validationRules={{*/}
                    {/*        required: {*/}
                    {/*            value: true,*/}
                    {/*            message: 'This field is required',*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}

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