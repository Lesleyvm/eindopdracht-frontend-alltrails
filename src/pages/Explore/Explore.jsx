import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import './Explore.css';
import axios from "axios";
import {useEffect, useState} from "react";

function Explore() {
    const [park, setPark] = useState([]);

    useEffect(() => {
        void fetchParkInfo();
    }, []);

    async function fetchParkInfo() {

        try {
            const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=15&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX')
            setPark(response.data.data)
            console.log(response.data.data);

        } catch (e) {
            console.error(e);
        }
    }

    const parkInfo = park.map((park) => (
        <div key={park.id} className="park-item">
            <h4>{park.name}</h4>
            {park.images && park.images.length > 0 && (
                <img src={park.images[0].url}
                     alt={park.images[0].caption || ""}
                     className="park-image"
                />
            )}
        </div>
    ));


    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="filter-group">
                    <input type="text"
                           placeholder="Find destination"
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
            </main>
            <Footer/>
        </>
    )
}

export default Explore;