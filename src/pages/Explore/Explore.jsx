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

function Explore() {
    const [parks, setParks] = useState([]);
    const [start, setStart] = useState(0);
    const [activityFilter, setActivityFilter] = useState('');
    const [feeFilter, setFeeFilter] = useState('');
    const limit = 16;

    useEffect(() => {
        void fetchParks();
    }, [start, activityFilter, feeFilter]);

    async function fetchParks(query = "") {

        try {
            let apiUrl = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`;

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
        }
    }

    // functie gemaakt om door alle beschikbare parken te kunnen bladeren
    function handleNextClick(){
        setStart(start + limit);
    }
    function handlePrevClick() {
        if (start >= limit) {
            setStart(start - limit);
        }
    }

    // functies om te kunnen filter/zoeken
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

        void fetchParks(query);
    }


    return (
        <div className="outer-container">
            <header>
                <Navigation/>
            </header>
            <main className="inner-container">
                <div className="filter-group">
                    <Searchbar
                        placeholder="Where are we going..."
                        className="explore-input"
                        classNameDiv="explore-wrapper"
                        onSearch={handleSearch}
                    />
                    {/*<Filters*/}
                    {/*    options={['1', '2', '3', '4', '5']}*/}
                    {/*    placeholder="Best rated"*/}
                    {/*    classname="filters"*/}
                    {/*/>*/}
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