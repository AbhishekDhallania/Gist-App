import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Gist } from "./pages/Gist";
import { Toaster } from "react-hot-toast";
import { GistDetail } from "./pages/GistDetail";
import { GistList } from "./pages/GistList";
import { useEffect } from "react";
import useAuthStore from "./store/AuthStore";
import { Loader } from "lucide-react";


export default function AppRoutes() {

  const { authenticate, isLoading, isLoggedIn }: any = useAuthStore(state => state)
  useEffect(() => {
    authenticate()
  }, [])

  if (isLoading && !isLoggedIn) {
    return <div className="h-screen flex items-center justify-center ">
      <Loader className="text-3xl size-8 animate-spin" />
    </div>
  }
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to={'/'} />} />
          <Route path="/" element={isLoggedIn ? <Gist /> : <Navigate to={'/login'} />} />
          <Route path="/gists" element={isLoggedIn ? <GistList /> : <Navigate to={'/login'} />} />
          <Route path="/gists/:id" element={isLoggedIn ? <GistDetail /> : <Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
