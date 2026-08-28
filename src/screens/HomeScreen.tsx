import { AboutUs } from "../components/HomeScreen/AboutUs";
import { Figures } from "../components/HomeScreen/Figures";
import { Hero } from "../components/HomeScreen/Hero";
import { Methodology } from "../components/HomeScreen/Methodology";
import { PracticeAreas } from "../components/HomeScreen/PracticeAreas";

function HomeScreen() {
    return (
        <div className="bg-white">
            <Hero />
            <Figures />
            <PracticeAreas />
            <Methodology />
            <AboutUs />
        </div>
    );
}

export default HomeScreen;
