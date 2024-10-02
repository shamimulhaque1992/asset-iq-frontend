import NavBar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex items-center justify-center p-6">
      {children}
    </main>
  );
}
