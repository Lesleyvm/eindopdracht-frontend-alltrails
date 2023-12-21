import './Home.css'
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";

function Home() {

    return (
        <div id="home" className="outer-container">
            <header>
                <Navigation/>
            </header>
            <main>
                <h1>Discover the outdoors within you</h1>
                <Searchbar
                    placeholder="Let's start exploring.. Where are we going?"
                    className="home-input"
                    classNameDiv="home-wrapper"
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