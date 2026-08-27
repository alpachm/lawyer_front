import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";

export const PrincipalLayout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};
