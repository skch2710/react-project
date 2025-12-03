import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/home/Home";
import Hostel from "./pages/hostel/Hostel";
import SideNav from "./pages/sidenav/SideNav";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected area */}
        <Route element={<PrivateRoute />}>
          <Route element={<SideNav />}>
            <Route path="/home" element={<Home />} />
            <Route path="/hostel" element={<Hostel />} />
            {/* add more protected routes here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
