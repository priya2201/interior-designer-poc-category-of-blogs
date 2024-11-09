import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Home";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Homelist from "./pages/HomeEdit.js";
import Home from "./pages/Home";
import HomeEdit from "./pages/HomeEdit.js";
import HomeDelete from "./pages/HomeDelete.js";
import HomeAdd from "./pages/HomeAdd.js";
import About from "./pages/About.js";
import AboutAdd from "./pages/AboutAdd.js";
import AboutEdit from "./pages/AboutEdit.js";
import AboutDelete from "./pages/AboutDelete.js";
import MainAbout from "./pages/MainAbout.js";
import MainAboutAdd from "./pages/MainAboutAdd.js";
import MainAboutEdit from "./pages/MainAboutEdit.js";
import MainAboutDelete from "./pages/MainAboutDelete.js";
import Trend from "./pages/Trend.js";
import TrendAdd from "./pages/TrendAdd.js";
import TrendEdit from "./pages/TrendEdit.js";
import TrendDelete from "./pages/TrendDelete.js";
import InteriorGallery from "./pages/gallery.js";
import GalleryEdit from "./pages/GalleryEdit.js";
import GalleryDelete from "./pages/GalleryDelete.js";
import GalleryAdd from "./pages/GalleryAdd.js";
import Contact from "./pages/Contact.js";
import Content from "./pages/Content.js";
import BlogContent from "./pages/ContentAdd.js";
import Author from "./pages/Author.js";
import AuthorAdd from "./pages/AuthorAdd.js";
import AuthorEdit from "./pages/AuthorEdit.js";
import AuthorDelete from "./pages/AuthorDelete.js";
import ContentEdit from "./pages/ContentEdit.js";
import BlogCategory from "./pages/BlogCategory.js";
import BlogCategoryAdd from "./pages/BlogCategoryAdd.js";
import BlogCategoryDelete from "./pages/BlogCategoryDelete.js";
import BlogCategoryEdit from "./pages/BlogCategoryEdit.js";
import ContentDelete from "./pages/ContentDelete.js";
import GalleryCategory from "./pages/GalleryCategory.js";
import GalleryCategoryAdd from "./pages/GalleryCategoryAdd.js";
import GalleryCategoryEdit from "./pages/GalleryCategoryEdit.js";
import GalleryCategoryDelete from "./pages/GalleryCategoryDelete.js";
import TodoEmp from "./pages/TodoEmp.js";
import Test from "./pages/test.js";
import DataAdd from "./pages/DataAdd.js";
import DataSee from "./pages/DataSee.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="home/add/" element={<HomeAdd />} />
          <Route path="home/:id" element={<HomeEdit />} />
          <Route path="home/delete/:id" element={<HomeDelete />} />
          <Route path="about" element={<About />} />
          <Route path="about/add/" element={<AboutAdd />} />
          <Route path="about/delete/:id" element={<AboutDelete />} />
          <Route path="about/:id" element={<AboutEdit />} />
          <Route path="aboutus" element={<MainAbout />} />
          <Route path="aboutus/add/" element={<MainAboutAdd />} />
          <Route path="aboutus/:id" element={<MainAboutEdit />} />
          <Route path="aboutus/delete/:id" element={<MainAboutDelete />} />
          <Route path="trend" element={<Trend />} />
          <Route path="trends/add" element={<TrendAdd />} />
          <Route path="trend/:id" element={<TrendEdit />} />
          <Route path="trend/delete/:id" element={<TrendDelete />} />
          <Route path="gallery" element={<InteriorGallery />} />
          <Route path="gallery/:id" element={<GalleryEdit />} />
          <Route path="gallery/delete/:id" element={<GalleryDelete />} />
          <Route path="gallery/add/" element={<GalleryAdd />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Content />} />
          <Route path="blog/add" element={<BlogContent />} />
          <Route path="blog/:id" element={<ContentEdit />} />
          <Route path="blog/delete/:id" element={<ContentDelete />} />
          <Route path="author" element={<Author />} />
          <Route path="author/add" element={<AuthorAdd />} />
          <Route path="author/:id" element={<AuthorEdit />} />
          <Route path="author/delete/:id" element={<AuthorDelete />} />
          <Route path="todos" element={<TodoEmp />} />
          <Route path="blogCategory" element={<BlogCategory />} />
          <Route path="blogCategory/add" element={<BlogCategoryAdd />} />
          <Route path="blogCategory/:id" element={<BlogCategoryEdit />} />
          <Route
            path="blogCategory/delete/:id"
            element={<BlogCategoryDelete />}
          />
          
                  <Route path="test" element={<Test />} />
        <Route path="dataAdd" element={<DataSee/> }/>
        <Route path="dataAdd/add" element={<DataAdd/>}/>
        <Route path="dataAdd/id" element={<DataAdd/>}/>
        <Route path="dataAdd/delete/id" element={<DataAdd/>}/>

          <Route path="galleryCategory" element={<GalleryCategory />} />
          <Route path="galleryCategory/add" element={<GalleryCategoryAdd />} />
          <Route path="galleryCategory/:id" element={<GalleryCategoryEdit />} />
          <Route
            path="galleryCategory/delete/:id"
            element={<GalleryCategoryDelete />}
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
