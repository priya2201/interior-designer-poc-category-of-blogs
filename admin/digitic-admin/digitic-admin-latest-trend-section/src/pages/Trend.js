import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
function Trend() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(4); // Number of items per page
  useEffect(() => {
    const fetchTrends = async (req, res) => {
      try {
        const response = await fetch("http://localhost:7000/interior/trends");
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
    fetchTrends();
  }, []);
  const handleTableChange = (pagination, filters, sorter) => {
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
      // Toggle sorting order if clicking on the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sorting column and default sorting order (descending)
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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Order",
      dataIndex: "order",
    },
    {
      title: "Id",
      dataIndex: "_id",
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
          <Link to={`/admin/trend/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/trend/delete/${record._id}`} style={buttonStyle}>
            Delete
          </Link>
        </span>
      ),
    },
  ];
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
  return (
    <div>
      <h3 className="mb-4 title">Latest Trends</h3>
      <Space>
        <Input.Search
          placeholder="Search Title"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Link to={`/admin/trends/add/`} style={buttonStyle}>
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

export default Trend;
