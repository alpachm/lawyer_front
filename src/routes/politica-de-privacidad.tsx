import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

export const Route = createFileRoute("/politica-de-privacidad")({
    component: PrivacyPolicyScreen,
});
