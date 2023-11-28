
function Filters({options, value, onChange, placeholder}) {
    return(
        <div>
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filters;