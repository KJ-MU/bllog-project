import "./App.css";
import SingleBlogPage from "./components/SingleBlogPage";
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage";
import Footer from "./components/Footer";
import BlogPage from "./components/BlogPage";
import LogInPage from "./components/LogInPage";
import HomePage from "./components/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { checkForToken } from "./store";
import Navbar from "./components/NavBar";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = checkForToken(token);
    dispatch({ type: "auth/getUser", payload: userInfo });
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
