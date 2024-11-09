import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import {
  UpOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";

function Content() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(4);
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
  useEffect(() => {
    const fetchBlogs = async (req, res) => {
      try {
        const response = await fetch("http://localhost:7000/interior/blog");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const handleTableChange = (pagination, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSortBy(sorter.field);
    setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const buttonStyle = {
    background: "linear-gradient(yellow, #ff7e5f, #Ffffed)",
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "12px",
    padding: "8px 10px",
    margin: "2px 3px",
  };
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
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      sortOrder: sortBy === "title" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleSort("title"),
      }),
    },
    {
      title: "Author",
      dataIndex: "authorId",
      render: (authorId) => getAuthorName(authorId),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      render: (categoryId) => getCategoryName(categoryId),
    },
    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      render: (featured) =>
        featured ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      sorter: true,
      sortOrder: sortBy === "updatedAt" && sortOrder,
      render: (text) => (
        <span>
          {text}
          {sortBy === "updatedAt" && (
            <span style={{ marginLeft: 8 }}>
              {sortOrder === "asc" ? <UpOutlined /> : <DownOutlined />}
            </span>
          )}
        </span>
      ),
      onHeaderCell: () => ({
        onClick: () => handleSort("updatedAt"),
      }),
    },
    {
      title: "Action",
      dataIndex: "_id", // Use a unique identifier
      render: (_, record) => (
        <span>
          <Link to={`/admin/blog/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/blog/delete/${record._id}`} style={buttonStyle}>
            Delete
          </Link>
        </span>
      ),
    },
  ];
  return (
    <div>
      <h3 className="mb-4 title">Blogs</h3>
      <Space>
        <Input.Search
          placeholder="Search Title"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Link to={`/admin/blog/add/`} style={buttonStyle}>
          Add
        </Link>
      </Space>
      <div>
        <Table
          columns={columns}
          dataSource={paginatedData}
          loading={loading}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default Content;
