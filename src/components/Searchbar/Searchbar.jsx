import {useState} from "react";
import { IoSearchOutline } from "react-icons/io5";
import './Searchbar.css';

function Searchbar({ onSearch, placeholder, className, classNameDiv}) {
    const [query, setQuery] = useState('');

    async function handleInputChange(e) {
        setQuery(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className={classNameDiv}>
            <IoSearchOutline className="search-icon" />
            <input type="text"
                   className={className}
                   placeholder={placeholder}
                   value={query}
                   onChange={handleInputChange}
            />
        </div>
    )
}

export default Searchbar;