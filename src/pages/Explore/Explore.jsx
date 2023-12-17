import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import './Explore.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import ParkDetail from "../../components/ParkDetail/ParkDetail.jsx";

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

    // functie gemaakt om alle parken te kunnen bladeren
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
                           placeholder="Where are we going?"
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
                    {parks.map((park) => (
                        <ParkDetail key={park.parkCode} park={park}/>
                    ))}
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