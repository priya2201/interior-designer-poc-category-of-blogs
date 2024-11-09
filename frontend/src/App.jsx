import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import Companies from "./components/Companies/Companies";
import LatestTrends from "./components/latestTrends/LatestTrends";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import GetStarted from "./components/GetStarted/GetStarted";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import ContactForm from "./components/Contact Form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./components/Blog/blogs";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import LandingPage from "./pages/LandingPage";
import AllBlogs from "./components/Blog/AllBlogs/AllBlogs";
// import ContactForm from "./components/Contact Form/ContactForm";

function App() {
  return (
    <div className="App">
      <div>
        <div className="gradient" />
        <Header />
      </div>

      <Router>
        <Routes>
          <Route element={<LandingPage />} index />
          <Route path="/blogs" element={<AllBlogs/>}/>
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
