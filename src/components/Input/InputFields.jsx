import './InputFields.css'
import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
function InputFields({ label, name, type, id, text, changeHandler, register, validationRules, errors}) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className='form-group'>
            <label htmlFor={id}>
                {label}
            </label>
                <input
                    type={passwordVisible ? 'text' : type}
                    id={id}
                    onChange={changeHandler}
                    placeholder={text}
                    {...register(name, validationRules)}
                />
            {type === 'password' && (
                <span className='password-toggle' onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEye/>  : <FaEyeSlash/> }
                </span>
            )}
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    )
}

export default InputFields;