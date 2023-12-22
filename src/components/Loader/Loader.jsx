import './Loader.css'
import {ThreeDots} from "react-loader-spinner";

function Loader() {
    return (
        <div className="loader">
            <ThreeDots
                color="#36BFB1"
                height="80"
                width="80"
                radius="9"
            />
        </div>
    )
}

export default Loader;