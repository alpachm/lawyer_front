import { createFileRoute } from "@tanstack/react-router";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";

export const Route = createFileRoute("/terminos-y-condiciones")({
    component: TermsAndConditionsScreen,
});
