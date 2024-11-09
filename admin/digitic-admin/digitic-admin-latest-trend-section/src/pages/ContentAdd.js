import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import Strikethrough from "@sotaproject/strikethrough";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import axios from "axios";
import TextVariantTune from "@editorjs/text-variant-tune";
import DragDrop from "editorjs-drag-drop";
import NestedList from "@editorjs/nested-list";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import AttachesTool from "@editorjs/attaches";
import ImageTool from "@editorjs/image";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function BlogContent() {
  const [form] = Form.useForm(); // Use Ant Design's useForm hook
  const ejInstance = useRef(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        new DragDrop(editor);
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        try {
          let content = await editor.saver.save();
          setContent(content);
          console.log(content);
        } catch (error) {
          console.error("Error saving data", error);
        }
      },
      tools: {
        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        paragraph: {
          class: Paragraph,
          tunes: ["textAlignment"],
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: "Enter a Header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        attaches: {
          class: AttachesTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                try {
                  const formData = new FormData();
                  formData.append("file", file);

                  const response = await axios.post(
                    "http://localhost:7000/interior/upload",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  if (response.data.success === 1) {
                    console.log("File uploaded successfully:", response.data);
                    return {
                      success: 1,
                      file: { url: response.data.file.url }, // Provide the URL of the uploaded file
                    };
                  } else {
                    console.error("Error uploading file:", response.data.error);
                    return { error: { message: "Failed to upload file" } };
                  }
                } catch (error) {
                  console.error("Error uploading file:", error.message);
                  return { error: { message: "Failed to upload file" } };
                }
              },
            },
          },
        },

        alert: {
          class: Alert,
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter Something",
          },
        },
        list: {
          class: List,
          config: {
            defaultStyle: "unordered",
          },
        },
        // list: {
        //   class: NestedList,
        //   inlineToolbar: true,
        //   config: {
        //     defaultStyle: "unordered",
        //   },
        // },
        nestedchecklist: editorjsNestedChecklist,
        checklist: {
          class: Checklist,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        underline: {
          class: Underline,
        },
        strikethrough: {
          class: Strikethrough,
        },
        Marker: {
          class: Marker,
        },
        InlineCode: {
          class: InlineCode,
        },
        changeCase: {
          class: ChangeCase,
        },
        Color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            defaultColor: "gray",
            type: "text",
            customPicker: true,
          },
        },
        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        textVariant: TextVariantTune,
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                // your own uploading logic here
                const formData = new FormData();
                formData.append("file", file);
                console.log(formData);
                const response = await axios.post(
                  `http://localhost:7000/interior/api/upload`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );

                if (response.data.success === 1) {
                  console.log(response.data, "filee");
                  return {
                    success: 1,
                    file: {
                      url: response.data.file.url,
                    },
                  };
                }
              },
              async uploadByUrl(url) {
                const response = await axios.post(
                  `http://localhost:7000/interior/api/uploadUrl`,
                  {
                    url,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );

                if (response.data.success === 1) {
                  console.log(response.data, "urll comee");
                  return response.data;
                }
              },
            },
            inlineToolbar: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const handleSave = async (values) => {
    try {
      const savedData = await ejInstance.current.save();
      const formattedContent = {
        blocks: savedData.blocks.map((block) => ({
          type: block.type,
          data: block.data,
        })),
        time: savedData.time,
        version: savedData.version,
      };
      console.log(formattedContent, "fa");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("content", JSON.stringify(formattedContent));
      formData.append("featured", values.featured);
      formData.append("bannerCaption", values.bannerCaption);
      formData.append("authorId", values.authorId); // Ensure these match backend keys
      formData.append("categoryId", values.categoryId); // Ensure these match backend keys
      formData.append("image", image); // Add the image file

      const response = await fetch("http://localhost:7000/interior/blog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImage(null);
        form.resetFields(); // Reset form fields after successful submit
        message.success("New Blog Added Successfully");
        navigate("/admin/blog");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        } else {
          message.error(data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      message.error(error.message);
    }
  };

  const handleFileChange = (info) => {
    if (info.file instanceof File) {
      setImage(info.file);
    }
  };

  return (
    <div>
      <h3>Add New Blog Entry</h3>
      <Form
        form={form} // Attach the form instance here
        onFinish={handleSave}
        layout="vertical"
        initialValues={{ featured: "no" }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Content">
          <div id="editorjs"></div>
        </Form.Item>
        <Form.Item
          name="bannerCaption"
          label="Banner Caption"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="authorId" label="Author" rules={[{ required: true }]}>
          <Select placeholder="Select an author">
            {authors.map((author) => (
              <Option key={author._id} value={author._id}>
                {author.firstName} {author.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="featured"
          label="Featured"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select yes or no">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={image ? [image] : []}
          >
            <Button icon={<UploadOutlined />}>Upload Single Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Entry
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BlogContent;
