import { Figures } from "../components/HomeScreen/Figures";
import { Hero } from "../components/HomeScreen/Hero";

function HomeScreen() {
    return (
        <div className="bg-white">
            <Hero />
            <Figures />
        </div>
    );
}

export default HomeScreen;
