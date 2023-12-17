import {FaStar} from 'react-icons/fa';
import {FaRegStar} from "react-icons/fa";
import './Rating.css';

function Rating({rating, clickHandler}) {

    return (
        <div className="rating-container">
            {[1, 2, 3, 4, 5].map((value) => (
                <span key={value} onClick={() => clickHandler(value)}>
          {value <= rating ? <FaStar className="star-active"/> : <FaRegStar className="star"/>}
                </span>
            ))}
        </div>
    );
}

export default Rating;
