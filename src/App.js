import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Default Route for Login/Signup */}
        <Route
          path="/"
          element={
            showSignUp ? (
              <SignUpForm onSwitch={() => setShowSignUp(false)} />
            ) : (
              <LoginForm onSwitch={() => setShowSignUp(true)} />
            )
          }
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
