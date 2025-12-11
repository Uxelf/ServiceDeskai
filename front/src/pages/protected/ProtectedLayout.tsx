import { Outlet, Navigate } from "react-router-dom";
import Footer from "../../features/footer/Footer";

interface ProtectedLayoutProps {
  isAuthenticated: boolean;
}

export default function ProtectedLayout({ isAuthenticated }: ProtectedLayoutProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
