import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './Parkinfo.css'
import Button from "../../components/Button/Button.jsx";
import {IoMdHeart} from "react-icons/io";
import {FavoritesContext} from "../../context/FavoritesContext.jsx";

function Parkinfo() {
    const [park, setPark] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {parkCode} = useParams();
    const {toggleFavorite} = useContext(FavoritesContext);

    useEffect(() => {
        void fetchPark();
    }, [parkCode]);

    async function fetchPark() {

        try {
            const response = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`)
            // find() methode om het park te vinden dat overeenkomt met de bijhorende parkCode zodat de info weergegeven kan worden op de pagina.
            const matchingPark = response.data.data.find(park => park.parkCode === parkCode);
            setPark(matchingPark);
            console.log(matchingPark);

        } catch (e) {
            console.error(e);
        }
    }

    // functies gemaakt om door de beschikbare afbeeldingen te kunnen bladeren
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % park.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + park.images.length) % park.images.length
        );
    };


    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="parkinfo-container">
                    <div className="parkinfo-item">
                        <h2>{park.name}</h2>
                        {park.images && park.images.length > 0 && (
                            <>
                                <div className="image-container">
                                <img
                                    src={park.images[currentImageIndex].url}
                                    alt={park.images[currentImageIndex].caption || ""}
                                    className="park-image parkinfo-image"
                                />
                                <Button
                                    text={<IoMdHeart className="heart-icon"/>}
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
                        <div className="comment-section">
                            <label htmlFor="comment-field">Comment</label>
                            <textarea name="" id="comment-field" cols="60" rows="7"></textarea>
                            <Button
                                text="Place"
                            />
                        </div>
                    </div>
                    <div>
                        <p>{park.description}</p>
                        <h4>What are the weather conditions like?</h4>
                        <p>{park.weatherInfo}</p>
                        <h4>How to get there?</h4>
                        <p>{park.directionsInfo}</p>
                        <h5>Not finished exploring yet? Click <Link to="/">here</Link> to return</h5>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Parkinfo;