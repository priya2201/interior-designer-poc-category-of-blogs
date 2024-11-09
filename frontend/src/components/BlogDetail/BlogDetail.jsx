import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";

function BlogDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
    return category ? `${category.categoryName}` : "Unknown";
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const blogData = await response.json();
        setData(blogData);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const updatedTimeStamp = (updatedAt) => {
    if (!updatedAt) return "Unknown date";
    const timeStamp = updatedAt.split("T");
    return timeStamp[0];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "800px", width: "100%" }}>
        {data && (
          <>
            <h1 className="primaryText">{data.title}</h1>
            <span className="text-secondary font-semibold text-base pt-2">
              {getAuthorName(data.authorId)}
              &nbsp; &nbsp; &nbsp;
              <h4 className="text-secondary-gray font-inter text-sm pt-2 flex gap-2">
                {getCategoryName(data.categoryId)}
                <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                {updatedTimeStamp(data.updatedAt)}
              </h4>
            </span>

            <h4>{data.description}</h4>
            {data.image && (
              <img
                style={{ width: "900px", height: "600px" }}
                src={data.image}
                alt="Blog"
              />
            )}
            {data.content && (
              <div>
                {JSON.parse(data.content).blocks.map((block, index) => {
                  switch (block.type) {
                    case "header":
                      const Tag = `h${block.data.level}`;
                      return (
                        <Tag
                          key={index}
                          dangerouslySetInnerHTML={{ __html: block.data.text }}
                        />
                      );
                    case "attaches":
                      return (
                        <h4 key={index}>
                          Here is the attachment Link You Can Download this file
                          &nbsp; &nbsp;
                          <a
                            style={{
                              color: "blue",
                              border: "1px solid black",
                              padding: "4px 6px",
                              borderRadius: "8px",
                            }}
                            href={block.data.file.url}
                            dangerouslySetInnerHTML={{
                              __html: block.data.title,
                            }}
                          />
                        </h4>
                      );
                    case "alert":
                      const alertClass = `alert-${block.data.type} alert-align-${block.data.align}`;
                      return (
                        <div
                          key={index}
                          className={alertClass}
                          dangerouslySetInnerHTML={{
                            __html: block.data.message,
                          }}
                        ></div>
                      );
                    case "list":
                      const ListTag =
                        block.data.style === "ordered" ? "ol" : "ul";
                      return (
                        <ListTag key={index}>
                          {block.data.items.map((item, i) => (
                            <li
                              key={i}
                              dangerouslySetInnerHTML={{ __html: item }}
                            ></li>
                          ))}
                        </ListTag>
                      );
                    case "nestedchecklist":
                      const renderNestedChecklist = (
                        items,
                        style = "unordered",
                        level = 0
                      ) => {
                        const NestedListTag = style === "ordered" ? "ol" : "ul";
                        return (
                          <NestedListTag
                            className={`nested-list level-${level}`}
                            key={index}
                          >
                            {items.map((item, i) => (
                              <li key={i} className="nested-item">
                                {item.checked !== null && (
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    readOnly
                                  />
                                )}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item.content,
                                  }}
                                ></span>
                                {item.items &&
                                  item.items.length > 0 &&
                                  renderNestedChecklist(
                                    item.items,
                                    style,
                                    level + 1
                                  )}
                              </li>
                            ))}
                          </NestedListTag>
                        );
                      };

                      return renderNestedChecklist(
                        block.data.items,
                        block.data.style
                      );
                    case "quote":
                      return (
                        <blockquote key={index}>
                          <h4>The quote is:</h4>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: block.data.text,
                            }}
                          ></p>
                          <h4>by:</h4>
                          <cite
                            dangerouslySetInnerHTML={{
                              __html: block.data.caption,
                            }}
                          ></cite>
                        </blockquote>
                      );
                    case "table":
                      return (
                        <table
                          key={index}
                          style={{ borderCollapse: "collapse", width: "100%" }}
                        >
                          <tbody>
                            {block.data.content.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    style={{
                                      border: "1px solid black",
                                      padding: "8px",
                                    }}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    case "image":
                      return (
                        <div key={index}>
                          <img
                            src={block.data.file.url}
                            alt={block.data.caption}
                          />
                          <h4>
                            Here is The Image Caption:{" "}
                            <span style={{ color: "blue" }}>
                              {block.data.caption}
                            </span>
                          </h4>
                        </div>
                      );
                    case "paragraph":
                      return (
                        <p
                          key={index}
                          dangerouslySetInnerHTML={{ __html: block.data.text }}
                        />
                      );
                    case "checklist":
                      return (
                        <div
                          key={index}
                          className="
                        checklist"
                        >
                          {block.data.items.map((item, i) => (
                            <div key={i}>
                              <input
                                type="checkbox"
                                checked={item.checked}
                                readOnly
                              />
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
