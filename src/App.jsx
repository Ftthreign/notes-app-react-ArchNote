import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Loading from "./components/Loading";

export default function App() {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {authUser ? (
          <>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/notes/archived"} element={<ArchivedPage />} />
            <Route path={"/notes/new"} element={<CreateNotePage />} />
            <Route path={"/notes/:id"} element={<NoteDetailPage />} />
            <Route path={"*"} element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"*"} element={<Navigate to={"/login"} replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
