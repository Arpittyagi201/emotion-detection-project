import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TextTestPage from "./pages/TextTestPage";
import VoiceTestPage from "./pages/VoiceTestPage";
import ImageTestPage from "./pages/ImageTestPage";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/test/text" element={<TextTestPage />} />
        <Route path="/test/voice" element={<VoiceTestPage />} />
        <Route path="/test/image" element={<ImageTestPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;


