import './ParkDetail.css'
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/Button.jsx";
import {IoMdHeart} from "react-icons/io";
function ParkDetail ({park}) {
    const { toggleFavorite } = useContext(FavoritesContext);

    return (
        <div key={park.id} className="park-item">
            <div className="image-container">
                {park.images && park.images.length > 0 && (
                    <img
                        src={park.images[0].url}
                        alt={park.images[0].caption || ""}
                        className="park-image"
                    />
                )}

                <Button
                    text={<IoMdHeart className="heart-icon" />}
                    className="favorite-button"
                    clickHandler={() => toggleFavorite(park)}
                />

            </div>
            <p>Ratings(stars)</p>
            <Link to={`/parkinfo/${park.parkCode}`}>
                <p className="park-title">
                    <strong>{park.name}</strong>
                </p>
            </Link>
            <p>{park.states}</p>
        </div>
    );
}

export default ParkDetail;