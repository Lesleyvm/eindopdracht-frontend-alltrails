import './Home.css'
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Home() {

    return (
        <div id="home" className="outer-container">
            <header>
                <Navigation/>
            </header>
            <main>
                <h1>Discover the outdoors within you</h1>
                <input type="text"
                       placeholder="Start exploring.. where are we going?"
                       className="search-bar"
                />
                <div>
                {/*    hier komt top rated*/}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home