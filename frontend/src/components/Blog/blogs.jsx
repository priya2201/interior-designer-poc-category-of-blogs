import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "./blogs.css";
const Blogs = () => {
  console.log("me blog");
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await fetch(
          "http://localhost:7000/interior/author"
        );
        const categoriesResponse = await fetch(
          "http://localhost:7000/interior/category"
        );

        if (!authorsResponse.ok) {
          throw new Error("Failed to fetch authors");
        }
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const authorsData = await authorsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const getAuthorName = (authorId) => {
    const author = authors.find((author) => author._id === authorId);
    console.log(author, "a");
    return author ? `${author.firstName} ${author.lastName}` : "Unknown";
  };
  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    console.log(category, "a");
    return category ? `${category.categoryName}` : "Unknown";
  };
  const updatedTimeStamp = (updatedAt) => {
    const timeStamp = updatedAt.split("T");
    return timeStamp[0];
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/featured");
        console.log(response, "resp");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log(data, "data from blogs");
        setBlogs(data);
      } catch (error) {
        console.log(error.message, "Error");
        setError(error.message);
      }
    };
    fetchBlogs();
  }, []);

  const sliderSettings = {
    spaceBetween: 30,
    slidesPerView: 4,
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
  };

  return (
    <section id="blog-Featured" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Latest Blogs</span>
          <span className="primaryText">BEST Featured Blogs OF OURS</span>
        </div>
        {error && <p>{error}</p>}
        <Swiper {...sliderSettings}>
          {blogs.map((card, i) => (
            <SwiperSlide key={i}>
              <Link to={`/blog/${card._id}`}>
                <div className="flexColStart r-card">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={card.image}
                    alt="blog"
                  />
                  <span className="primaryText">{card.title}</span>
                  <span className="text-secondary font-semibold text-base pt-2">
                    {getAuthorName(card.authorId)}
                  </span>
                  <h4 className="text-secondary-gray font-inter text-sm pt-2 flex gap-2">
                    {getCategoryName(card.categoryId)}
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    {updatedTimeStamp(card.updatedAt)}
                  </h4>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blogs;
