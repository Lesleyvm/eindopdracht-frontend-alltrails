import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import './Explore.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import {Link} from "react-router-dom";

function Explore() {
    const [parks, setParks] = useState([]);
    const [start, setStart] = useState(0);
    const limit = 16;

    useEffect(() => {
        void fetchParks();
    }, [start]);

    async function fetchParks() {

        try {
            const response = await axios.get(`https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`)
            setParks(response.data.data)
            console.log(response.data.data);

        } catch (e) {
            console.error(e);
        }
    }

    const parkInfo = parks.map((parks) => (
        // gebruik gemaakt van checks om aanwezigheid van eigenschappen te controleren om fouten te voorkomen als er geen inhoud in zit.
        <div key={parks.id} className="park-item">
            {parks.images && parks.images.length > 0 && (
                <img src={parks.images[0].url}
                     alt={parks.images[0].caption || ""}
                     className="park-image"
                />
            )}
            <p>Ratings(stars)</p>
            <Link to={`/parkinfo/${parks.parkCode}`}>
                <p className="park-title"><strong>{parks.name}</strong></p>
            </Link>
            <p>{parks.states}</p>
        </div>
    ));

    const handleNextClick = () => {
        setStart(start + limit);
    };
    const handlePrevClick = () => {
        if (start >= limit) {
            setStart(start - limit);
        }
    };

    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="filter-group">
                    <input type="text"
                           placeholder="Let's find a destination"
                           className=""
                    />
                    <Filters
                        options={['1', '2', '3', '4', '5']}
                        placeholder="Best rated"
                    />
                    <Filters
                        options={['1', '2', '3', '4', '5']}
                        placeholder="Activity"
                    />
                    <Filters
                        options={['1', '2', '3', '4', '5']}
                        placeholder="Fee"
                    />
                </div>

                <div className="park-list">
                    {parkInfo}
                </div>
                <div className="buttons-explore">
                    <Button
                        text="Previous"
                        clickHandler={handlePrevClick}
                    />
                    <Button
                        text="Next"
                        clickHandler={handleNextClick}
                    />
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Explore;