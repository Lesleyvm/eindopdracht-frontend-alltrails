import './EditProfile.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import InputFields from "../Input/InputFields.jsx";
import Button from "../Button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Notifications from "../Notifications/Notifications.jsx";

function EditProfile() {
    const [notification, setNotification] = useState(null);
    const {watch, register, handleSubmit, formState: {errors}} = useForm();
    const {user} = useContext(AuthContext);
    const watchPassword = watch('password', ''); // om te controleren of wachtwoorden overeen komen

    async function handleEditSubmit(data) {
        // formdata gesplitst vanwege de API documentatie
        const formData = {};

        if (data.email) {
            formData.email = data.email;
        }

        if (data.password && data.repeat) {
            formData.password = data.password;
            formData.repeatedPassword = data.repeat;
        }

        try {
            // Geeft een foutmelding als er geen gegevens zijn ingevoerd
            if (!Object.keys(formData).length) {
                setNotification({
                    type: "error",
                    message: "No changes made. Please enter data to update your profile."
                });
                return;
            }

            const response = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user", formData, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            });

            console.log(response);
            setNotification({
                type: "success",
                message: "Details successfully changed!",
            });

        } catch (e) {
            console.error(e);
            setNotification({
                type: "error",
                message: "Oops! Something went wrong. Please try again.",
            });
        }
    }

    return (
        <>
            {notification && (
                <Notifications
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <form onSubmit={handleSubmit(handleEditSubmit)}>
                <InputFields

                    label="E-mail"
                    type="email"
                    name="email"
                    id="email"
                    register={register}
                    errors={errors}
                />
                <InputFields
                    label="Password"
                    type="text"
                    name="password"
                    id="password"
                    register={register}
                    validationRules={{
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters.',
                        },
                    }}
                    errors={errors}
                />
                <InputFields
                    label="Repeat password"
                    type="text"
                    name="repeat"
                    id="repeat"
                    register={register}
                    validationRules={{
                        validate: (value) =>
                            value === watchPassword ||
                            'Passwords do not match.',
                    }}
                    errors={errors}
                />
                <div className="button-wrapper">
                    <Button
                        text="Change e-mail or password"
                        buttonType="submit"
                        className="profile-buttons"
                    />
                </div>
            </form>
        </>
    )
}

export default EditProfile;