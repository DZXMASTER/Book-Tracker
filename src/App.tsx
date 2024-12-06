import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

const AppLayout: React.FC = () => {

  const location = useLocation();
  const { user, loading } = useAuth();

  const hiddenNavbarRoutes = ["/login", "/register"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && location.pathname !== "/login" && location.pathname !== "/register") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!hiddenNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;