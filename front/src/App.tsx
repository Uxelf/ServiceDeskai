import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ThemeProvider from "./components/ThemeProvider";
import TicketsList from "./pages/protected/ticketsList/TicketsList";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import type { AppDispatch, RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import UploadPage from "./pages/protected/upload/UploadPage";
import { useEffect, useState } from "react";
import { checkAuth } from "./store/thunk/checkAuth.thunk";
import TicketView from "./pages/protected/ticketView/TicketView";
import Profile from "./pages/protected/profile/Profile";
import Create from "./pages/protected/create/Create";
import CreateUser from "./pages/protected/create/CreateUser";
import CreateOffice from "./pages/protected/create/CreateOffice";
import NotFound from "./pages/notFound/NotFound";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth()).then(() => setLoading(false));
  }, [dispatch]);

  const {user} = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  return (
    <>
    <ThemeProvider />
    { loading && <div className="w-dvw h-dvh">Loading...</div>}
    {
      !loading &&
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout isAuthenticated={isAuthenticated}/>}>
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/:id" element={<TicketView />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create/user" element={<CreateUser />} />
        <Route path="/create/office" element={<CreateOffice />} />
        <Route path="/create" element={<Create />} />
      </Route>
      <Route path="/" element={<Navigate to="/tickets" replace/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    }
    </>
  );
}

export default App;
