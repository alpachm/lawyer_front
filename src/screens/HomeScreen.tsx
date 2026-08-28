import { AboutUs } from "../components/HomeScreen/AboutUs";
import { Figures } from "../components/HomeScreen/Figures";
import { Hero } from "../components/HomeScreen/Hero";
import { PracticeAreas } from "../components/HomeScreen/PracticeAreas";

function HomeScreen() {
    return (
        <div className="bg-white">
            <Hero />
            <Figures />
            <PracticeAreas />
            <AboutUs />
        </div>
    );
}

export default HomeScreen;
