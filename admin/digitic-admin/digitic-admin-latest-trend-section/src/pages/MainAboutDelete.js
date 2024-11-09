import React from "react";
import { Button, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
const MainAboutDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    confirm({
      title: "Are you sure you want to delete this entry?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:7000/interior/aboutus/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (response.ok) {
            message.success("Entry deleted successfully");
            navigate("/admin/aboutus");
          } else {
            message.error(data.message || "Failed to delete entry");
            navigate("/admin/aboutus");
          }
        } catch (error) {
          console.error("Failed to delete About Main Section:", error);
          message.error("Failed to delete About Main Section");
          navigate("/admin/aboutus");
        }
      },
    });
  };
  const buttonStyle = {
    background: "linear-gradient(yellow, #ff7e5f, #Ffffed)",
    border: "2px solid black",
    color: "black",
    fontSize: "16px",
    borderRadius: "12px",
    padding: "8px 10px",
    margin: "2px 3px",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    width: "80px",
    height: "40px",
  };

  return (
    <div>
      <h3>Delete About Main Section Entry</h3>
      <Button onClick={handleDelete} type="danger" style={buttonStyle}>
        Delete
      </Button>
    </div>
  );
};

export default MainAboutDelete;
