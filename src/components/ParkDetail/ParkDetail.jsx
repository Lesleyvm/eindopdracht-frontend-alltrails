import './ParkDetail.css'
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/Button.jsx";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeartCircleMinus } from "react-icons/fa6";

function ParkDetail ({park}) {
    const { toggleFavorite, getFavorites } = useContext(FavoritesContext);
    const favorites = getFavorites();
    const isFavorite = favorites.some(
        (favoritePark) => favoritePark.parkCode === park.parkCode
    );

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
                    text={isFavorite ? <FaHeartCircleMinus className="active-favorite" /> : <FaHeartCirclePlus className="default-favorite " />}
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