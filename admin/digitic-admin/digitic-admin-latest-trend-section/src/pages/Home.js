import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/home");
        if (!response.ok) {
          throw new Error("Failed to fetch home data");
        }
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        setError(error.message);
        // notification.error({
        //   message: "Error",
        //   description: error.message,
        // });
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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_, record) => (
        <span>
          <Link to={`/admin/home/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/home/delete/${record._id}`} style={buttonStyle}>
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
      <h3 className="mb-4 title">Home</h3>
      <Link to={`/admin/home/add/`} style={buttonStyle}>
        Add
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <Table
          columns={columns}
          dataSource={homeData}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default Home;
