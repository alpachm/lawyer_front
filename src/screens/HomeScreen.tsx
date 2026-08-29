import { AboutUs } from "../components/HomeScreen/AboutUs";
import { Contact } from "../components/HomeScreen/Contact";
import { FAQ } from "../components/HomeScreen/FAQ";
import { Figures } from "../components/HomeScreen/Figures";
import { Hero } from "../components/HomeScreen/Hero";
import { Methodology } from "../components/HomeScreen/Methodology";
import { PracticeAreas } from "../components/HomeScreen/PracticeAreas";
import { Testimonials } from "../components/HomeScreen/Testimonials";
import { WhatsappCTA } from "../components/HomeScreen/WhatsappCTA";

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
            <Contact />
            <WhatsappCTA />
        </div>
    );
}

export default HomeScreen;
