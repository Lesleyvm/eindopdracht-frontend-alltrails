import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './Parkinfo.css'

function Parkinfo() {
    const [park, setPark] = useState([]);
    const {parkCode} = useParams();

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

    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="park-info-item">
                    {park.images && park.images.length > 0 && (
                        <img src={park.images[0].url}
                             alt={park.images[0].caption || ""}
                             className="park-image"
                        />
                    )}
                    <h2>{park.name}</h2>
                    <p>{park.description}</p>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Parkinfo;