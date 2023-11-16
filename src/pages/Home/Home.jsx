import './Home.css'
import Navigation from "../../components/Navigation/Navigation.jsx";
import Button from "../../components/Button/Button.jsx";

function Home() {

    return (
        <div className="outer-container">
            <header>
                <Navigation/>
            </header>
            <main>
                <h1>Discover the outdoors within you</h1>
                <Button
                text="Start exploring... where are we going?"
                />
                <div>
                    <h2> TOP RATED</h2>
                </div>
            </main>
            <footer></footer>
        </div>
    )
}

export default Home