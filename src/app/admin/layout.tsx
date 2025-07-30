import AdminNavbar from "@/components/admin/layouts/Navbar";
import Footer from "@/components/(main)/layouts/Footer";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar />
                <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}