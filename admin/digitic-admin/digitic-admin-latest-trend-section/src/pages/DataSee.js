import React, { useEffect, useState } from "react";
import { Table,} from "antd";
import { Link } from "react-router-dom";

const DataSee = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[data,setData]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/dataAdd");
        if (!response.ok) {
          throw new Error("Failed to fetch home data");
        }
        const data = await response.json();
          setHomeData(data);
          console.log(data,'d')
      } catch (error) {
        setError(error.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    const getFaqData = (id) => {
      let faq = data.find(d => d._id == id)
      console.log(faq, 'faq')
      return faq ? `${faq.question}` : null
    }
  useEffect(() => {
    const handleAnother = async () => {
      const response = await fetch('http://localhost:7000/interior/faq')
      const data = await response.json()
      console.log(data, 'd')
      setData(data)
    }
    handleAnother()
  },[])
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
        title: "Subtitle",
        dataIndex: "subtitle",
        },
    {
      title: "Id",
      dataIndex: "_id",
      },
      {
          title: 'Number',
          dataIndex:'number'
      },
      {
          title: 'faqId',
          dataIndex: 'faqId',
          render:(faqId)=>getFaqData(faqId)
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
          <Link to={`/admin/dataAdd/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
       <Link to={`/admin/dataAdd/delete/${record._id}`} style={buttonStyle}>
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
      <h3 className="mb-4 title">Data Add</h3>
      <Link to={`/admin/dataAdd/add`} style={buttonStyle}>
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

export default DataSee;
