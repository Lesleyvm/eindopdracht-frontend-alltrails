
//
// export const addToFavorites = (park) => {
//     // Haal de huidige favorietenlijst op uit de lokale opslag (LocalStorage)
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//
//     // Controleer of het park al in de favorietenlijst staat
//     const isAlreadyFavorite = favorites.some((favoritePark) => favoritePark.parkCode === park.parkCode);
//
//     // Voeg het park toe aan de favorietenlijst als het er nog niet in staat
//     if (!isAlreadyFavorite) {
//         favorites.push(park);
//
//         // Update de favorietenlijst in de lokale opslag
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//     }
// };
//
// export const removeFromFavorites = (parkCode) => {
//     // Haal de huidige favorietenlijst op uit de lokale opslag
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//
//     // Filter het park uit de favorietenlijst
//     const updatedFavorites = favorites.filter((favoritePark) => favoritePark.parkCode !== parkCode);
//
//     // Update de favorietenlijst in de lokale opslag
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
// };
//
// export const getFavorites = () => {
//     // Haal de huidige favorietenlijst op uit de lokale opslag
//     return JSON.parse(localStorage.getItem('favorites')) || [];
// };
