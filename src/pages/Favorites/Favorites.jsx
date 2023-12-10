import './Favorites.css'
import Button from "../../components/Button/Button.jsx";
import {IoMdHeart} from "react-icons/io";
import {Link} from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useContext} from "react";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";

function Favorites() {
    const { getFavorites, toggleFavorite } = useContext(FavoritesContext);
    const favorites = getFavorites();

    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="favorites-container">
                    <h2>Your Favorite Parks</h2>
                    {favorites.length === 0 ? (
                        <p>No favorite parks yet.</p>
                    ) : (
                        <ul className="test">
                            {favorites.map((favoritePark) => (
                                <li key={favoritePark.parkCode}>
                                    <div className="image-container">
                                        {favoritePark.images && favoritePark.images.length > 0 && (
                                            <img src={favoritePark.images[0].url}
                                                 alt={favoritePark.images[0].caption || ""}
                                                 className="park-image"
                                            />
                                        )}
                                        <Button
                                            text={<IoMdHeart className="heart-icon"/>}
                                            className="favorite-button"
                                            clickHandler={() => toggleFavorite(favoritePark)}
                                        />
                                    </div>
                                    <p>Ratings(stars)</p>
                                    <Link to={`/parkinfo/${favoritePark.parkCode}`}>
                                        <p className="park-title"><strong>{favoritePark.name}</strong></p>
                                    </Link>
                                    <p>{favoritePark.states}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Favorites;