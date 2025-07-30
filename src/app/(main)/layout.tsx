import Navbar from "@/components/(main)/layouts/Navbar";
import Footer from "@/components/(main)/layouts/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-4 overflow-y-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
}