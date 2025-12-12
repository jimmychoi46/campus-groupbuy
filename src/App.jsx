import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./store/auth";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/listings"
            element={
              <PrivateRoute>
                <Listings />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/new"
            element={
              <PrivateRoute>
                <NewListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <ListingDetail />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
