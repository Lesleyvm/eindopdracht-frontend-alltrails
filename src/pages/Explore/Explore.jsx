import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import './Explore.css';
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.jsx";
import ParkDetail from "../../components/ParkDetail/ParkDetail.jsx";
import axios from "axios";
import {filterParksByFees} from "../../helpers/feeFilter.js";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Notifications from "../../components/Notifications/Notifications.jsx";
import {debounce} from "../../helpers/debounce.js";

function Explore() {
    const [parks, setParks] = useState([]);
    const [start, setStart] = useState(0);
    const [activityFilter, setActivityFilter] = useState('');
    const [feeFilter, setFeeFilter] = useState('');
    const [loading, toggleLoading] = useState(false)
    const [notification, setNotification] = useState(null);
    const debouncedFetchParks = debounce(fetchParks, 500);
    const limit = 16;

    useEffect(() => {
        void fetchParks();

    }, [start, activityFilter, feeFilter]);

        async function fetchParks(query = "") {
            toggleLoading(true);

            try {
                let apiUrl = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=${import.meta.env.VITE_NPS_API_KEY}`;

                if (activityFilter) {
                    apiUrl += `&q=${activityFilter}`;
                }

                if (query) {
                    apiUrl += `&q=${query}`;
                }

                const response = await axios.get(apiUrl);
                let filteredParks = response.data.data;

                if (feeFilter) {
                    filteredParks = filteredParks.filter((park) =>
                        filterParksByFees(park, feeFilter)
                    );
                }

                setParks(filteredParks);

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


    // om door alle beschikbare parken te kunnen bladeren
    function handleNextClick(){
        setStart(start + limit);
    }
    function handlePrevClick() {
        if (start >= limit) {
            setStart(start - limit);
        }
    }

    // om te kunnen filter/zoeken
    function handleActivityFilterChange(filter) {
        setActivityFilter(filter);
    }

    function handleFeeFilterChange(filter) {
        setFeeFilter(filter);
    }

    function handleSearch(query) {
        setActivityFilter('');
        setFeeFilter('');
        setStart(0);

        // om te voorkomen dat een request uitgevoert wordt bij iedere getypte letter
        debouncedFetchParks(query);
    }


    return (
        <div className="outer-container">
            <header>
                <Navigation/>
            </header>
            {loading && <Loader/>}
            {notification && (
                <Notifications
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <main className="inner-container">
                <div className="filter-group">
                    <Searchbar
                        placeholder="Where are we going..."
                        className="explore-input"
                        classNameDiv="explore-wrapper"
                        onSearch={handleSearch}
                    />
                    <Filters
                        options={['Astronomy', 'Wildlife Watching', 'Guided Tours', 'Camping', 'Stargazing']}
                        placeholder="Activity"
                        classname="filters"
                        onChange={handleActivityFilterChange}
                        selectedValue={activityFilter}
                    />
                    <Filters
                        options={['0', '10-15', '15-25', '25-35', '35-50']}
                        placeholder="Fee"
                        classname="filters"
                        onChange={handleFeeFilterChange}
                        selectedValue={feeFilter}
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
        </div>
    )
}

export default Explore;