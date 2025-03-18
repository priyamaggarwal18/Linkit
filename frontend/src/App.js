import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Your existing landing page
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Analytics } from "@vercel/analytics/react"
import Dashboard from "./pages/Dashboard";
import PublicProfile from "./pages/PublicProfile";
import Rankings from "./pages/Rankings";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Router>
      <div>
        <Analytics/>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard (Protected Route) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Public Profile */}
          <Route path="/profile/:username" element={<PublicProfile />} />

          {/* Rankings */}
          <Route path="/rankings" element={<Rankings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
