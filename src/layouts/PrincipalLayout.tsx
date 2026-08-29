import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const PrincipalLayout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
