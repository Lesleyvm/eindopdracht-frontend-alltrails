import './Button.css'
function Button({buttonType = "button", text, disabled, clickHandler, className}) {
    return(
        <>
            <button type={buttonType}
                    disabled={disabled}
                    onClick={clickHandler}
                    className={className}
            >
                {text}
            </button>
        </>
    )
}

export default Button;