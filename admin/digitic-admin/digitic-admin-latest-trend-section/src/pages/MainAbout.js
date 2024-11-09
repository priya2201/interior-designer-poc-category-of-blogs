import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const MainAbout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/aboutus");
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Action",
      dataIndex: "_id", // Use a unique identifier
      render: (_, record) => (
        <span>
          <Link to={`/admin/aboutus/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/aboutus/delete/${record._id}`} style={buttonStyle}>
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
      <h3 className="mb-4 title">About Us</h3>
      <Link to={`/admin/aboutus/add/`} style={buttonStyle}>
        Add
      </Link>

      <div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default MainAbout;
