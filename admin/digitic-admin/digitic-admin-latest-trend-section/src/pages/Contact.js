import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
function Contact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    const fetchTrends = async (req, res) => {
      try {
        const response = await fetch("http://localhost:7000/interior/contact");
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

  const filteredData = data.filter(
    (item) =>
      item.firstName &&
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
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
  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      sorter: true,
      sortOrder: sortBy === "firstName" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleSort("firstName"),
      }),
    },
    {
      title: "LastName",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneno",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
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
  ];
  const buttonStyle = {
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
      <h3 className="mb-4 title">Contact Data</h3>
      <Space>
        <Input.Search
          placeholder="Search FirstName"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
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

export default Contact;
