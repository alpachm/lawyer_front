import { AboutUs } from "../components/HomeScreen/AboutUs";
import { Figures } from "../components/HomeScreen/Figures";
import { Hero } from "../components/HomeScreen/Hero";
import { Methodology } from "../components/HomeScreen/Methodology";
import { PracticeAreas } from "../components/HomeScreen/PracticeAreas";
import { Testimonials } from "../components/HomeScreen/Testimonials";

function HomeScreen() {
    return (
        <div className="bg-white">
            <Hero />
            <Figures />
            <PracticeAreas />
            <Methodology />
            <Testimonials />
            <AboutUs />
        </div>
    );
}

export default HomeScreen;
