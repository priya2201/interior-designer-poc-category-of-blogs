import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const GalleryCategory = () => {
  const [galleryData, setgalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt"); // Default sorting column
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(4); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchgalleryData();
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();

        setgalleryData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchgalleryData = async () => {
    return fetch("http://localhost:7000/interior/galleryCategory");
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      // Toggle sorting order if clicking on the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sorting column and default sorting order (descending)
      setSortBy(column);
      setSortOrder("desc");
    }
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSortBy(sorter.field);
    setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
  };

  const filteredData = galleryData.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const columns = [
    {
      title: "CategoryName",
      dataIndex: "categoryName",
      sorter: true,
      sortOrder: sortBy === "categoryName" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleSort("categoryName"),
      }),
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
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_, record) => (
        <span>
          <Link to={`/admin/galleryCategory/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link
            to={`/admin/galleryCategory/delete/${record._id}`}
            style={buttonStyle}
          >
            Delete
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Gallery Categories Data</h3>
      <Space>
        <Input.Search
          placeholder="Search Category"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Link to={`/admin/galleryCategory/add/`} style={buttonStyle}>
          Add
        </Link>
      </Space>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
};

export default GalleryCategory;
