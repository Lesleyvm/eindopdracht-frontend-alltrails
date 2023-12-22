import InputFields from "../../components/Input/InputFields.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/Button/Button.jsx";
import './Contact.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/alltrails-logo.png";
function Contact() {
    const [success, toggleSuccess] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        const formData = {
            subject: data.subject,
            email: data['email-field'],
            title: data['title-field'],
            description: data['problem-description']
        }

        try {
            toggleSuccess(true);
            console.log(formData);

        } catch (e) {
            console.error(e);
        }

    }

    return (
        <div id="contact" className="outer-container">
            <span className="logo-wrapper secondary-logo">
                <Link to="/">
                <img src={logo} alt="Company Logo"/>
                </Link>
            </span>

            <main className="inner-container contact-section">
                {success ? (
                    <div>
                        <p className="success-message">Thank you for getting in touch with us! We will get back to you in
                            2 working-days. Click <Link to="/">here</Link> to get back to exploring.</p>
                    </div>
                ) : (
                    <div className="contactform-wrapper">
                        <h2>Submit a request</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}
                              className="contactform">
                            <select defaultValue=""
                                    {...register('subject', {
                                        required: {
                                            value: true,
                                            message: 'This field is required'
                                        }
                                    })}
                            >
                                <option value="" disabled hidden>
                                    How can we help?
                                </option>
                                <option>Technical issue</option>
                                <option>Account</option>
                                <option>Feedback</option>
                                <option>Complaint</option>
                            </select>
                            {errors.subject && <p className="error-message">{errors.subject.message}</p>}

                            <InputFields
                                label="Title"
                                type="text"
                                name="title-field"
                                id="title-field"
                                register={register}
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'This field is required',
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Title must contain at least 5 characters"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "Exceeded the maximum amount of 16 characters"
                                    }
                                }}
                                errors={errors}
                            />
                            <InputFields
                                label="E-mail adress"
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
                            <label htmlFor="problem-description">Description</label>
                            <textarea id="problem-description"
                                      cols="60"
                                      rows="20"
                                      name="description"
                                      className="description-area"
                                      {...register('problem-description', {
                                          required: {
                                              value: true,
                                              message: 'This field is required',
                                          },
                                          minLength: {
                                              value: 100,
                                              message: "Message must contain a minimum of 100 characters"
                                          },
                                          maxLength: {
                                              value: 450,
                                              message: "Exceeded the maximum amount of 450 characters"
                                          }
                                      })}
                            />
                            {errors['problem-description'] &&
                                <p className="error-message">{errors['problem-description'].message}</p>}

                            <div className="button-wrapper">
                                <Button
                                    buttonType="submit"
                                    text="Submit"
                                />
                            </div>
                        </form>
                    </div>
                )};
            </main>
        </div>
    )
}

export default Contact;