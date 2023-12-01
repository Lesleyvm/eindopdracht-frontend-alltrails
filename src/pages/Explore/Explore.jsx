import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import './Explore.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";

function Explore() {
    const [park, setPark] = useState([]);
    const [start, setStart] = useState(0);
    const limit = 16;

    useEffect(() => {
        void fetchPark();
    }, [start]);

    async function fetchPark() {

        try {
            const response = await axios.get(`https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`)
            setPark(response.data.data)
            console.log(response.data.data);

        } catch (e) {
            console.error(e);
        }
    }

    const parkInfo = park.map((park) => (
        // gebruik gemaakt van checks om aanwezigheid van eigenschappen te controleren om fouten te voorkomen als er geen inhoud in zit.
        <div key={park.id} className="park-item">
            {park.images && park.images.length > 0 && (
                <img src={park.images[0].url}
                     alt={park.images[0].caption || ""}
                     className="park-image"
                />
            )}
            <p>Ratings(stars)</p>
            <p className="park-title"><strong>{park.name}</strong></p>
            <p>Place</p>
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