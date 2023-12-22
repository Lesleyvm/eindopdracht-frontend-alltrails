import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './Parkinfo.css'
import Button from "../../components/Button/Button.jsx";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";
import {FaHeartCircleMinus, FaHeartCirclePlus} from "react-icons/fa6";
import Rating from "../../components/Rating/Rating.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import { BsTrash3 } from "react-icons/bs";
import Notifications from "../../components/Notifications/Notifications.jsx";
import Loader from "../../components/Loader/Loader.jsx";

function Parkinfo() {
    const [park, setPark] = useState([]);
    const [rating, setRating] = useState(0);
    const [notification, setNotification] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, toggleLoading] = useState(false)
    const {parkCode} = useParams();
    const {toggleFavorite, getFavorites} = useContext(FavoritesContext);
    const isFavorite = getFavorites().some(
        (favoritePark) => favoritePark.parkCode === park.parkCode
    );
    const { isAuth, user } = useContext(AuthContext);
    const {register, reset,handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        void fetchPark();
        // haalt beoordeling op uit LS
        const savedRating = localStorage.getItem(`rating_${parkCode}`);
        if (savedRating !== null) {
            setRating(parseInt(savedRating, 10));
        }
    }, [parkCode]);

    async function fetchPark() {

        toggleLoading(true);
        try {
            const response = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`)
            // find() methode om het park te vinden dat overeenkomt met de bijhorende parkCode zodat de info weergegeven kan worden op de pagina.
            const matchingPark = response.data.data.find(park => park.parkCode === parkCode);
            setPark(matchingPark);
            console.log(matchingPark);

        } catch (e) {
            console.error(e);
            setNotification({
                type: "error",
                message: "Oops! Something went wrong. Please try again."
            });

        } finally {
            toggleLoading(false);
        }
    }

    // functies gemaakt om door de beschikbare afbeeldingen te kunnen bladeren
    function nextImage() {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % park.images.length);
    }

    function prevImage() {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + park.images.length) % park.images.length
        );
    }

    // functie gemaakt om rating toe te voegen
    function handleRate(value) {
        // Controleer of de gebruiker is ingelogd
        if (!isAuth) {
            setNotification({
                type: "error",
                message: "Please log in first to rate the park.",
            });
            return;
        }
        // Plaats de rating als de gebruiker is ingelogd
        setRating(value);
        localStorage.setItem(`rating_${parkCode}`, value);
    }

    function onSubmit(data) {
        if (!isAuth) {
            setNotification({
                type: "error",
                message: "Please log in first to place a comment.",
            });
            return;
        }
        const comment = {
            text: data.comment,
            user: user.username, // Voeg de gebruikersnaam toe aan de comment
        };

        // Voeg de comment toe aan de lijst
        setComments([...comments, comment]);

        // Reset het formulier nadat het is verzonden
        reset();
    }

    function deleteComment(index) {
        // Kopieer de huidige lijst met commentaren
        const updatedComments = [...comments];

        // Verwijder het commentaar op de opgegeven index
        updatedComments.splice(index, 1);

        // Werk de commentaarlijst bij
        setComments(updatedComments);
    }

    return (
        <div className="outer-container">
            <header>
                <Navigation/>
            </header>
            {loading && <Loader/>}
            <main className="inner-container">
                <div className="parkinfo-container">
                    <section className="parkinfo-item">
                        <h2>{park.name}</h2>
                        <Rating
                            rating={rating}
                            clickHandler={handleRate}
                        />
                        {park.images && park.images.length > 0 && (
                            <>
                                <div className="image-container">
                                    <img
                                        src={park.images[currentImageIndex].url}
                                        alt={park.images[currentImageIndex].caption || ""}
                                        className="park-image parkinfo-image"
                                    />
                                    <Button
                                        text={isFavorite ? <FaHeartCircleMinus className="active-favorite"/> :
                                            <FaHeartCirclePlus className="default-favorite "/>}
                                        className="favorite-button"
                                        clickHandler={() => toggleFavorite(park)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        text="<<"
                                        clickHandler={prevImage}
                                    />
                                    <Button
                                        text=">>"
                                        clickHandler={nextImage}
                                    />
                                </div>
                            </>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="comments-form">
                            <label htmlFor="comment-field">Comment</label>
                            <textarea
                                name="comment"
                                id="comment-field"
                                cols="60"
                                rows="7"
                                {...register("comment", {
                                    minLength: {
                                        value: 12,
                                        message: "Comment must contain at least 12 characters."
                                    }
                                })}
                            />
                            {errors.comment && <p className="error-message">{errors.comment.message}</p>}
                            <Button
                                text="Place"
                                buttonType="submit"
                            />
                        </form>

                        <div>
                            <h3>Submitted Comments:</h3>
                            {comments.length === 0 ? (
                                <p>This park has no comments yet.</p>
                            ) : (
                                <ul>
                                    {comments.map((comment, index) => (
                                        <li key={index}>
                                            <p>
                                                <strong>{comment.user}:</strong> {comment.text}
                                                {isAuth && comment.user === user.username && (
                                                    // Toon de verwijderknop alleen als de gebruiker ingelogd is
                                                    // en het commentaar van de huidige gebruiker is
                                                    <Button
                                                        text={<BsTrash3 />}
                                                        clickHandler={() => deleteComment(index)}
                                                        className="delete-button"
                                                    />
                                                )}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>

                    <section className="parkinfo-details">
                        <h4>{park.fullName}</h4>
                        <p>{park.description}</p>
                        <h4>What are the weather conditions like?</h4>
                        <p>{park.weatherInfo}</p>
                        {park.activities && park.activities.length > 0 ? (
                            <>
                            <h4>What to do?</h4>
                            <ul className="activity-list">
                                {park.activities.map((activity) => (
                                    <li key={activity.id}>{activity.name}</li>
                                ))}
                            </ul>
                            </>
                            ) : (
                                <i><p>No activities available.</p></i>
                        )}
                        {park.entranceFees && park.entranceFees.length > 0 ? (
                            <>
                                <h4>Entrance fees:</h4>
                                <ul className="entrance-list">
                                    {park.entranceFees.map((fee) => (
                                        <li key={fee.cost}>
                                            <strong>{fee.title}</strong>- ${fee.cost}
                                            <p>{fee.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <i><p>No entrance fees required to visit this park.</p></i>
                        )}
                        <h4>How to get there?</h4>
                        <p>{park.directionsInfo}</p>
                        <p>{park.states}</p>
                        <h5>Not finished exploring yet? Click <Link to="/">here</Link> to return</h5>
                    </section>

                </div>
                {notification && (
                    <Notifications
                        type={notification.type}
                        message={notification.message}
                        onClose={() => setNotification(null)}
                    />
                )}
            </main>
            <Footer/>
        </div>
    )
}

export default Parkinfo;