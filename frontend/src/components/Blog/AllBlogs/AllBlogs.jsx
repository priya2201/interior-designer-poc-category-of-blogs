import React, { useState, useEffect } from "react";
import "./AllBlogs.css";
import { Link } from "react-router-dom";

function AllBlogs() {
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
    return author ? `${author.firstName} ${author.lastName}` : "Unknown";
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.categoryName : "Unknown";
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="all-blogs">
      {error && <p className="error">{error}</p>}
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`}>
            <div key={blog._id} className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
              <p className="blog-author">
                Author: {getAuthorName(blog.authorId)}
              </p>
              <h4 className="text-secondary-gray font-inter text-sm pt-2 flex gap-2">
                Category: {getCategoryName(blog.categoryId)}
              </h4>
              <p className="blog-updated">
                Updated: {new Date(blog.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;
