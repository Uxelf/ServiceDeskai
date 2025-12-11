import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ThemeProvider from "./components/ThemeProvider";
import TicketsList from "./pages/protected/ticketsList/TicketsList";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import type { RootState } from "./store/store";
import { useSelector } from "react-redux";

function App() {

  const token = useSelector((state: RootState) => state.user.token);
  const isAuthenticated = !!!token;

  return (
    <>
    <ThemeProvider />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
        <Route path="/tickets" element={<TicketsList />} />
      </Route>
      <Route path="/" element={<TicketsList/>} />
    </Routes>
    </>
  );
}

export default App;
