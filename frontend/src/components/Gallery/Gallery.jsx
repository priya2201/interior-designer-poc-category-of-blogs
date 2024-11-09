import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchImages("all");
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:7000/interior/categoriesUnique");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log(data, "d fetch categories");
      setCategories(["all", ...data]); // Adding 'all' as an option
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchImages = async (categoryName) => {
    try {
      const endpoint =
        categoryName === "all"
          ? "http://localhost:7000/interior/gallery/categories/data"
          : `http://localhost:7000/interior/gallery/category/${categoryName}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      const images = data.map((item) => item.image);
      setImages(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    fetchImages(categoryName);
  };

  const capitalizeText = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div id="portfolio">
      <div className="c-container">
        <span className="orangeText">Our Portfolio</span>
        <br />
        <span className="primaryText">The Best Gallery is here</span>
        <br />
        <span className="secondaryText">
          We always ready to help by providing the best services for you. We
          believe a good place to live can make your life better
        </span>
        <br />
        <br />
      </div>
      <div className="category-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-text ${
              category === selectedCategory ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {capitalizeText(category)}
          </button>
        ))}
      </div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            className="gallery-image"
            key={index}
            src={image}
            alt={`Gallery ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
