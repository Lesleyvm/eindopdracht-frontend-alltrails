import './Favorites.css'
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useContext} from "react";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import ParkDetail from "../../components/ParkDetail/ParkDetail.jsx";

function Favorites() {
    const { getFavorites } = useContext(FavoritesContext);
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
                                <ParkDetail key={favoritePark.parkCode} park={favoritePark} />
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