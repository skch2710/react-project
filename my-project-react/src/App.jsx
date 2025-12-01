import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/home/Home";
import Hostel from "./pages/hostel/Hostel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/hostel" element={<Hostel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
