import './InputFields.css'
function InputFields({ label, name, type, id, register, validationRules, errors }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...register(name, validationRules)}
            />
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    )
}

export default InputFields;