import './Signup.css';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import logo from "../../assets/alltrails-logo.png";
import InputFields from "../../components/Input/InputFields.jsx";
import Button from "../../components/Button/Button.jsx";
import axios from "axios";

function Signup() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {
        // const [error, toggleError] = useState(false);
        const formData = {
            username: data['username-field'],
            email: data['email-field'],
            password: data['password-field'],
            role: ['user']
        }

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", formData);
            console.log(response);


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
                    <InputFields
                        label="E-mail"
                        type="text"
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