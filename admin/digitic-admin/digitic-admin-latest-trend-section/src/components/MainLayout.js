import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { FcGallery } from "react-icons/fc";
import { AiFillHeart } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import { SiTrendmicro } from "react-icons/si";
import { FcAbout } from "react-icons/fc";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";

import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlogger2 } from "react-icons/im";

import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">LY</span>
            <span className="lg-logo" style={{ color: "black" }}>
              We Design Digital Happiness <AiFillHeart />
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "home",
              icon: <CiHome className="fs-4" />,
              label: "Home",
            },
            {
              key: "aboutus",
              icon: <AiFillHeart className="fs-4" />,
              label: "About Us",
            },
            {
              key: "about",
              icon: <FcAbout className="fs-4" />,
              label: "About FAQS",
            },
            {
              key: "trend",
              icon: <SiTrendmicro className="fs-4" />,
              label: "Latest Trends",
            },
            {
              key: "galleryCategory",
              icon: <MdOutlineCategory className="fs-4" />,
              label: "Gallery Category",
            },
            {
              key: "gallery",
              icon: <FcGallery className="fs-4" />,
              label: "Portfolio",
            },
            {
              key: "contact",
              icon: <FaWpforms className="fs-4" />,
              label: "Contact Form",
            },
            {
              key: "author",
              icon: <IoPeopleCircleSharp className="fs-4" />,
              label: "Author Data",
            },
            {
              key: "blogCategory",
              icon: <MdCategory className="fs-4" />,
              label: "Category Data",
            },
            {
              key: "blog",
              icon: <ImBlogger2 className="fs-4" />,
              label: "Blog Content",
            },
            {
              key: "todos",
              icon: <ImBlogger2 className="fs-4" />,
              label: "Todo Task",
            },
            {
              key: 'dataAdd',
              icon: <ImBlogger2 className="fs-4" />,
              label: "Data Add",
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              {/* <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span> */}
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                {/* <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                /> */}
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Lemon Yellow</h5>

                <p className="mb-0">CONTENT MANAGEMENT SYSTEM</p>
                <p className="mb-0">Admin Panel</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
