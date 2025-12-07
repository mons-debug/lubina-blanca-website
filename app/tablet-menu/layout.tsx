import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu | Lubina Blanca",
    description: "Browse our full menu - Authentic Mediterranean Seafood in Tangier",
};

export default function TabletMenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout removes the Navigation component for the tablet menu
    // The tablet-menu page has its own header
    return <>{children}</>;
}
