import NavBar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen bg-light_gray">
      <div className="flex h-screen container p-5">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col ms-5 overflow-hidden">
          {/* Navbar */}
          <NavBar />

          {/* Main Content Area */}
          <main className="flex-1 py-5 bg-gray-100">{children}</main>
        </div>
      </div>
    </section>
  );
}
