import {createContext, useState, useEffect, useContext} from "react";
import Notifications from "../components/Notifications/Notifications.jsx";
import {AuthContext} from "./AuthContext.jsx";
export const FavoritesContext = createContext();
function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState(null);
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        //  Haal de opgeslagen favorieten op bij het laden van de context
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []); // Lege afhankelijkheidsarray, wordt alleen uitgevoerd bij de eerste render

    useEffect(() => {
        // Wanneer de favorieten wijzigen, update de lokale opslag
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]); // Voer uit wanneer de favorieten wijzigen

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    function addToFavorites(park) {

        if (!isAuth) {
            showNotification({type: "error", message: "Please log in to add parks to favorites."});
            return;
        } else {

            setFavorites((prevFavorites) => {
                // Controleer of het park al in de favorietenlijst staat
                const isAlreadyFavorite = prevFavorites.some(
                    (favoritePark) => favoritePark.parkCode === park.parkCode
                );

                // Voeg het park toe aan de lijst als het er nog niet in staat
                if (!isAlreadyFavorite) {
                    showNotification('Park is added to your favorites!');
                    return [...prevFavorites, park];
                }

                // Geef de bestaande lijst terug als het park al favoriet is
                return prevFavorites;
            });
        }
    }

    function removeFromFavorites(parkCode) {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favoritePark) => favoritePark.parkCode !== parkCode)
        );
        showNotification("Park is deleted from your favorites!");
    }

    function toggleFavorite(park) {
        const isFavorite = favorites.some(
            (favoritePark) => favoritePark.parkCode === park.parkCode
        );

        // Als het park al favoriet is, verwijder het dan uit de lijst, zo niet voeg deze toe
        if (isFavorite) {
            removeFromFavorites(park.parkCode);
        } else {
            addToFavorites(park);
        }
    }

    function getFavorites() {
        return favorites;
    }

    return (
        <FavoritesContext.Provider
            value={{ addToFavorites, removeFromFavorites, getFavorites, toggleFavorite }}
        >
            {children}
            {notification && <Notifications type={notification.type}
                                            message={notification.message}
                                            onClose={() => setNotification(null)} />}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;

