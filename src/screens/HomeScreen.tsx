import { AboutUs } from "../components/HomeScreen/AboutUs";
import { FAQ } from "../components/HomeScreen/FAQ";
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
            <FAQ />
        </div>
    );
}

export default HomeScreen;
