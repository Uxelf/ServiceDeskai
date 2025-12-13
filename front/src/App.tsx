import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ThemeProvider from "./components/ThemeProvider";
import TicketsList from "./pages/protected/ticketsList/TicketsList";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import type { RootState } from "./store/store";
import { useSelector } from "react-redux";
import UploadPage from "./pages/protected/upload/UploadPage";

function App() {

  const token = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!token;

  return (
    <>
    <ThemeProvider />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/upload" element={<UploadPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/tickets" replace/>} />
    </Routes>
    </>
  );
}

export default App;
