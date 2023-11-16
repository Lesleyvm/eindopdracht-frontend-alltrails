
import './Home.css'
import Navigation from "../../components/Navigation.jsx";
function Home() {

    return (
        <div className="outer-container">
            <header>
               <Navigation/>
            </header>
            <main>
            <h1>Discover the outdoors within you</h1>
            <button>Start exploring.. where are we going?</button>
            </main>
            <footer></footer>
        </div>
    )
}

export default Home