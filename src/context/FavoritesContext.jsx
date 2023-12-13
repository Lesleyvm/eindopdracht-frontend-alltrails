import {createContext, useState, useEffect} from "react";
import Notifications from "../components/Notifications/Notifications.jsx";
export const FavoritesContext = createContext();
function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        //  Haal de opgeslagen favorieten op bij het laden van de context
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []); // Lege afhankelijkheidsarray, wordt alleen uitgevoerd bij de eerste render

    useEffect(() => {
        // Wanneer de favorieten wijzigen, update de lokale opslag
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]); // Voer uit wanneer de favorieten wijzigen

    function addToFavorites(park) {

        // helaas niet werkend gekregen!
        // if (isAuth) {
        //     console.error("User not authenticated");
        //     setNotification({type: "error", message: "Please log in to add parks to favorites."});
        //
        // } else {

            setFavorites((prevFavorites) => {
                // Controleer of het park al in de favorietenlijst staat
                const isAlreadyFavorite = prevFavorites.some(
                    (favoritePark) => favoritePark.parkCode === park.parkCode
                );

                // Voeg het park toe aan de lijst als het er nog niet in staat
                if (!isAlreadyFavorite) {
                    setNotification({type: "success", message: "Park is added to your favorites!"});

                    return [...prevFavorites, park];
                }

                // Geef de bestaande lijst terug als het park al favoriet is
                return prevFavorites;
            });
        }

    function removeFromFavorites(parkCode) {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favoritePark) => favoritePark.parkCode !== parkCode)
        );
        setNotification({type: "success", message: "Park is deleted from your favorites!"});
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

