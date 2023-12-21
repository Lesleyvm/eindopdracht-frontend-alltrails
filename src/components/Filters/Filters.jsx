import { useState } from 'react';
import './Filters.css'

function Filters({ options, selectedValue, onChange, placeholder, classname }) {
    const [value, setValue] = useState(selectedValue || '');

    const handleSelect = (selected) => {
        setValue(selected);
        onChange(selected);
    };

    return (
        <div>
            <select
                className={classname}
                value={value}
                onChange={(e) => handleSelect(e.target.value)}
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
    );
}

export default Filters;