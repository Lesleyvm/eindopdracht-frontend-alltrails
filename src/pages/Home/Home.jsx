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
                    placeholder="Click on explore to start exploring..."
                    className="home-input"
                    classNameDiv="home-wrapper"
                />
            </main>
            <Footer/>
        </div>
    )
}

export default Home