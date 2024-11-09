const Home = require("../models/home");
const Page = require("../models/pages");
const About = require("../models/about");
const Data = require("../models/data");
const Portfolio = require("../models/portfolio");
const Member = require("../models/member");
const Contact = require("../models/contact");
const Testimonial = require("../models/testimonials");
const Latest_Trend = require("../models/trend");
const Login = require("../models/login");
const FAQ = require("../models/faq");
const Gallery = require("../models/galleryDetail");
const addAbout = require("../controllers/image");
const router = require("express").Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { createClient } = require("@supabase/supabase-js");
// const supabaseUrl = "https://ykmowljgyvzwdcmkmffi.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbW93bGpneXZ6d2RjbWttZmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5NTE5NDUsImV4cCI6MjAyNzUyNzk0NX0.NuOkvx9d5ToQMccyx9dal2RCAMpAAsbjPnlpI-aK0l8";
// const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseUrl = "https://mwxvdqylxfhdulzdzygt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13eHZkcXlseGZoZHVsemR6eWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyODMxNzIsImV4cCI6MjAzMzg1OTE3Mn0.r0LC2ZPglj-jBWHCsLJMeqi-ppjemTs6RFKSyo6HVaQ";
const supabase = createClient(supabaseUrl, supabaseKey);
// console.log(supabase, "sp");
cloudinary.config({
  cloud_name: "dlaahua4u",
  api_key: "189524512316711",
  api_secret: "XtS8YfVdcvtTOkpPn4dRIYzuOLU",
});
const storage3 = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CMS",
    // allowedFormats: ["jpg", "png"],
    format: async (req, file) => "png",
    public_id: (req, file) => {
      return `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
    },
  },
});

const upload = multer({
  storage: storage3,
});
const nodemailer = require("nodemailer");
// const {
//   login,
// } = require("../../admin/digitic-admin/src/features/auth/authSlice");
const { parsePhoneNumber } = require("libphonenumber-js");
const Blog = require("../models/blog");
const Author = require("../models/author");
const BlogCategory = require("../models/category");

router.post("/page", async (req, res) => {
  try {
    const { title, description } = req.body;
    const add = new Page({ ...req.body });
    await add.save();
    console.log(add);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Fail" });
  }
});
router.post("/data", async (req, res) => {
  try {
    const { title, number } = req.body;
    const add = new Data({ ...req.body });
    await add.save();
    console.log(add);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Fail" });
  }
});
router.post("/portfolio", upload.single("image"), async (req, res, next) => {
  try {
    const getPage = await Page.findOne({ title: "Portfolio" });
    console.log(getPage, "---");
    if (getPage) {
      const add = new Portfolio({
        page: getPage._id,
        title: getPage.title,
        description: getPage.description,
        image: req.file.path,
        category: req.body.category,
      });
      await add.save();
      console.log(add);
      return res.status(201).json(add);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.get("/portfolio/get", async (req, res) => {
  try {
    const getGallery = await Portfolio.find({ category: "Furniture" });
    console.log(getGallery);
    return res.status(200).json(getGallery);
  } catch (error) {}
});
router.post("/member", upload.single("image"), async (req, res, next) => {
  try {
    const add = new Member({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      image: req.file.path,
    });
    await add.save();
    console.log(add);
    return res.status(201).json(add);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.post("/home", upload.array("images"), async (req, res, next) => {
  try {
    const getHome = await Home.find({});
    console.log(getHome, "gh");
    if (getHome.length !== 1) {
      if (req.files && req.files.length > 0) {
        const imagesPaths = req.files.map((file) => file.path);
        console.log(imagesPaths);
        const add = new Home({
          title: req.body.title,
          description: req.body.description,
          images: imagesPaths,
        });

        await add.save();
        console.log(add);
        return res.status(201).json(add);
      } else {
        console.log("REQ: ", req.body.images);
        return res.status(400).json({ message: "No files uploaded" });
      }
    } else {
      return res.status(400).json({
        message:
          "Home page contains only one set of data. You have the option to edit this existing data or delete it entirely to create a new set of Home data",
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/home/:id", async (req, res) => {
  try {
    const deletedEntry = await Home.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.patch("/home/:id", upload.array("images"), async (req, res) => {
  console.log("in");
  try {
    const editEntry = await Home.findById(req.params.id);

    if (!editEntry) {
      return res.status(404).json({ message: "Entry Not found" });
    }

    let imagesPaths = [];

    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      imagesPaths = req.files.map((file) => file.path);
      console.log(imagesPaths, "images");
    } else if (editEntry.images && editEntry.images.length > 0) {
      imagesPaths = editEntry.images; // Retain existing images if no new images are uploaded
      console.log(imagesPaths, "existing images retained");
    } else {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Assuming validation for title and description is needed
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Update the home entry
    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        images: imagesPaths,
      },
      { new: true, runValidators: true }
    );

    console.log(updatedHome);
    return res
      .status(200)
      .json({ message: "Home updated successfully", updatedHome });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});

router.get("/home", async (req, res) => {
  try {
    const get = await Home.find();
    console.log(get);
    return res.status(201).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/aboutus", upload.single("image"), async (req, res, next) => {
  try {
    const getAbout = await About.find({});
    console.log(getAbout, "gh");
    if (getAbout.length !== 1) {
      if (req.file) {
        let add = new About({
          title: req.body.title,
          description: req.body.description,
          subtitle: req.body.subtitle,
          image: req.file.path,
        });

        await add.save();
        console.log(add);
        return res.status(201).json(add);
      } else {
        return res.status(400).json({ message: "No file uploaded" });
      }
    } else {
      return res.status(400).json({
        message:
          "About page contains only one set of data. You have the option to edit this existing data or delete it entirely to create a new set of Home data",
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors);
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
        console.log((errors[field] = error.errors[field].message));
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json(error.message);
  }
});
router.delete("/aboutus/:id", async (req, res) => {
  try {
    const deletedEntry = await About.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.patch("/aboutus/:id", upload.single("image"), async (req, res) => {
  try {
    const editEntry = await About.findById(req.params.id);

    if (!editEntry) {
      return res.status(404).json({ message: "Entry Not found" });
    }
    let imagepaths = [];
    if (req.file) {
      imagepaths = req.file.path;
      console.log(req.file.path);
    } else if (editEntry.image) {
      imagepaths = editEntry.image;
    } else {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Assuming validation for title and description is needed
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Update the home entry
    const updated = await About.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        subtitle: req.body.subtitle,
        image: imagepaths,
      },
      { new: true, runValidators: true }
    );
    console.log(updated);
    return res
      .status(200)
      .json({ message: "About updated successfully", updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.get("/aboutus/:id", async (req, res) => {
  try {
    const get = await About.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/faq/:id", async (req, res) => {
  try {
    const get = await FAQ.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/home/:id", async (req, res) => {
  try {
    const get = await Home.findById(req.params.id);
    console.log(get, "comes from get home");
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/aboutus", async (req, res) => {
  try {
    const get = await About.find();
    console.log(get);
    return res.status(201).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/faq", async (req, res) => {
  try {
    const get = await FAQ.find().sort("order");
    // console.log(get, "getfaq");
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.get("/faq/get/here", async (req, res) => {
  try {
    const { page = 1, limit = 4, sort = "-updatedAt", search } = req.query;

    let query = {};
    if (search) {
      query = { question: { $regex: search, $options: "i" } };
    }

    const faqs = await FAQ.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalCount = await FAQ.countDocuments(query);

    // Determine sorting order
    const sortDirection = sort.startsWith("-") ? "desc" : "asc";

    return res.status(200).json({
      success: true,
      data: faqs,
      pagination: {
        total: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        limit: limit,
      },
      sortDirection: sortDirection, // Include sorting direction in response
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/testimonial", upload.single("image"), async (req, res, next) => {
  try {
    const add = new Testimonial({
      city: req.body.city,
      description: req.body.description,
      image: req.file.path,
      name: req.body.name,
    });
    await add.save();
    console.log(add);
    return res.status(201).json(add);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.post("/faq", async (req, res, next) => {
  try {
    console.log('in ')
    const orderExists = await FAQ.findOne({
      order: req.body.order,
    });
    console.log(orderExists, "oe");
    if (orderExists) {
      return res
        .status(400)
        .json({ message: "FAQ entry with that order already exists" });
    }
    if (!req.body.question || !req.body.answer || !req.body.order) {
      return res
        .status(400)
        .json({ error: "Question, answer and order are required" });
    }

    const add = new FAQ({
      question: req.body.question,
      answer: req.body.answer,
      order: req.body.order,
    });

    await add.save();

    console.log("New FAQ entry added:", add);

    return res
      .status(201)
      .json({ message: "New FAQ entry added successfully", data: add });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    console.error("Error adding new FAQ entry:", error);

    return res.status(500).json({ error: "Failed to add new FAQ entry" });
  }
});
router.patch("/faq/:id", async (req, res) => {
  try {
    let { question, answer, order } = req.body;
    const existingEntry = await FAQ.findOne({
      order: req.body.order,
      _id: { $ne: req.params.id },
    });
    if (existingEntry) {
      return res.status(400).json({
        message: "Another FAQ entry already has the same order number",
      });
    }
    if (!question || !answer || !order) {
      return res
        .status(400)
        .json({ message: "Question, answer, and order are required" });
    }
    // Proceed with updating the entry
    const updatedEntry = await FAQ.findOneAndUpdate(
      { _id: req.params.id },
      {
        question: question,
        answer: answer,
        order: order,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedEntry, "ue");
    return res
      .status(200)
      .json({ message: "FAQ entry updated successfully", updatedEntry });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/faq/:id", async (req, res) => {
  try {
    const deletedEntry = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/sendmail", async (req, res, next) => {
  try {
    const { firstName, lastName, email, subject, message, phoneno } = req.body;

    // Check for missing required fields
    if (!firstName || !lastName || !email || !subject || !message || !phoneno) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
      phoneno,
    });
    const validationError = newContact.validateSync();
    if (validationError) {
      let errors = {};
      for (let field in validationError.errors) {
        errors[field] = validationError.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    // Send mail (assuming your nodemailer setup)
    const mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "priya.murpani@ly.design",
        pass: "liff tuhc kwbn nfdi",
      },
    });

    const mailOptions = {
      from: "priya.murpani@ly.design",
      to: email,
      subject: "Welcome to our Website",
      html: `<h1>Welcome, ${firstName} ${lastName}!</h1>
        <p>Thank you for expressing interest in interior design for your home. We appreciate your visit to our website.</p>
        <p>We have received your message and will get back to you shortly. In the meantime, feel free to explore our website for design inspirations.</p>
        <p>Best regards,<br>Lemon Yellow</p>`,
    };

    // await mailTransporter.sendMail(mailOptions);
    await newContact.save();
    console.log(newContact, "nc");
    console.log(mailOptions);
    res.status(200).json({
      message:
        "Your message is sent successfully and we will get back to you shortly",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/gallery-info", async (req, res, next) => {
  try {
    const getImage = await Portfolio.findById(req.body._id);
    console.log(getImage, "---");
    if (getImage) {
      const add = new Gallery({
        image: getImage._id,
        category: getImage.category,
        title: req.body.title,
        description: req.body.description,
        subtitle: req.body.subtitle,
      });
      await add.save();
      console.log(add);
      return res.status(201).json(add);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.get("/contact", async (req, res) => {
  try {
    const get = await Contact.find();
    console.log(get, "get");
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/download-brochure", (req, res) => {
  const brochurePath = path.join(
    __dirname,
    "../public/Get_Started_With_Smallpdf.pdf"
  );
  res.download(brochurePath, "brochure.pdf", (error) => {
    if (error) {
      console.error("Error downloading brochure:", error);
      res.status(500).send("Sorry, something went wrong.");
    }
  });
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "----");
    const user = await Login.findOne({
      email: "admin@gmail.com",
      passowrd: "admin",
    });
    console.log(email, password);

    // if (!user) {
    //   return res.status(401).json({ message: "User not found" });
    // }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }

    // Password is valid, user is authenticated
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//latest trends apis
router.post("/trends", upload.single("image"), async (req, res, next) => {
  try {
    console.log("inside");
    const existingOrder = await Latest_Trend.findOne({ order: req.body.order });
    console.log(existingOrder, "eo");
    if (existingOrder) {
      return res.status(400).json({ error: "Order already exists" });
    }
    const { title, description, order } = req.body;
    console.log(req.body);
    console.log(title, description);
    const image = req.file;
    const add = new Latest_Trend({
      title: title,
      description: description,
      image: image.path,
      order: order,
    });

    await add.save();

    console.log("New Latest Trend entry added:", add);

    return res.status(201).json({
      message: "New  Latest Trend entry added successfully",
      data: add,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    console.error("Error adding new  Latest Trend entry:", error);

    return res
      .status(500)
      .json({ error: "Failed to add new  Latest Trend entry" });
  }
});
router.get("/trends", async (req, res) => {
  try {
    const get = await Latest_Trend.find().sort("order");
    console.log(get, "get");
    return res.status(201).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/trend/:id", upload.single("image"), async (req, res) => {
  try {
    let { title, description, order } = req.body;

    const existingOrder = await Latest_Trend.findOne({
      order: order,
      _id: { $ne: req.params.id },
    });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists" });
    }
    const editEntry = await Latest_Trend.findById(req.params.id);

    if (!editEntry) {
      return res.status(404).json({ message: "Entry Not found" });
    }
    if (!title || !description || !order) {
      return res
        .status(400)
        .json({ message: "Title, Description, and Order are required" });
    }
    let imagepaths = [];
    if (req.file) {
      imagepaths = req.file.path;
      console.log(req.file.path);
    } else {
      imagepaths = editEntry.image;
      console.log(imagepaths);
    }
    //else {
    //   return res.status(400).json({ message: "No files uploaded" });
    // }

    // Assuming validation for title and description is needed
    // if (!req.body.title || !req.body.description) {
    //   return res
    //     .status(400)
    //     .json({ message: "Title, description and order are required" });
    // }

    // Update the home entry
    const updated = await Latest_Trend.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title,
        description: description,
        image: imagepaths,
        order: order,
      },
      { new: true, runValidators: true }
    );
    console.log(updated);
    return res
      .status(200)
      .json({ message: "Latest Trend updated successfully", updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/trend/:id", async (req, res) => {
  try {
    const deletedEntry = await Latest_Trend.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/trend/:id", async (req, res) => {
  try {
    const get = await Latest_Trend.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//portfolio
router.post("/gallery", upload.single("image"), async (req, res) => {
  try {
    // Check if the order already exists
    const existingOrder = await Portfolio.findOne({ order: req.body.order });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists" });
    }

    const add = new Portfolio({
      image: req.file.path,
      order: req.body.order,
      categoryId: req.body.categoryId,
    });

    await add.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Portfolio item added successfully", data: add });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    console.error("Error adding portfolio item:", error);
    res.status(500).json({ message: error.message });
  }
});
router.patch("/gallery/:id", upload.single("image"), async (req, res, next) => {
  try {
    let { categoryId, order } = req.body;

    const existingOrder = await Portfolio.findOne({
      order: order,
      _id: { $ne: req.params.id },
    });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists" });
    }
    const editEntry = await Portfolio.findById(req.params.id);

    if (!editEntry) {
      return res.status(404).json({ message: "Entry Not found" });
    }
    if (!categoryId || !order) {
      return res
        .status(400)
        .json({ message: "CategoryId and Order are required" });
    }
    let imagepaths = [];
    if (req.file) {
      imagepaths = req.file.path;
      console.log(req.file.path);
    } else {
      imagepaths = editEntry.image;
      console.log(imagepaths);
    }

    const updated = await Portfolio.findByIdAndUpdate(
      { _id: req.params.id },
      {
        categoryId: categoryId,
        image: imagepaths,
        order: order,
      },
      { new: true, runValidators: true }
    );
    console.log(updated);
    return res
      .status(200)
      .json({ message: "Gallery Entry updated successfully", updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/gallery/:id", async (req, res) => {
  try {
    const deletedEntry = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Endpoint to fetch images by category
router.get("/gallery/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const data = await Portfolio.find({ category });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/gallery/get/:id", async (req, res) => {
  try {
    const get = await Portfolio.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/gallery", async (req, res, next) => {
  try {
    const data = await Portfolio.find().sort({ order: 1 });
    // const get = data.flatMap((data) => data.image);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting portfolio item:", error);
    res.status(500).json({ message: error.message });
  }
});
//gallery category
router.post("/galleryCategory", async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const capitalized =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const addCategory = new GalleryCategory({
      categoryName: capitalized,
    });

    await addCategory.save();
    console.log(addCategory);

    return res.status(200).json(addCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.get("/galleryCategory/:id", async (req, res) => {
  try {
    const get = await GalleryCategory.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/categoriesUnique", async (req, res) => {
  try {
    console.log("in");
    const categories = await GalleryCategory.find().distinct("categoryName");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

// Endpoint to get images by category
router.get("/gallery/category/:categoryName", async (req, res) => {
  try {
    console.log("in");
    const { categoryName } = req.params;
    const category = await GalleryCategory.findOne({ categoryName });
    console.log(category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const portfolios = await Portfolio.find({ categoryId: category._id });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
});

// Endpoint to get all images
router.get("/gallery/categories/data", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate("categoryId");
    console.log("in gallery");
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
});
router.get("/galleryCategory", async (req, res, next) => {
  try {
    console.log("-");
    const getCategories = await GalleryCategory.find({});
    // console.log(getCategories);
    return res.status(200).json(getCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.patch("/galleryCategory/:id", async (req, res) => {
  try {
    let { categoryName } = req.body;
    const existingEntry = await GalleryCategory.findById(req.params.id);
    if (!existingEntry) {
      return res.status(400).json({
        message: "Gallery Category Not Found",
      });
    }
    if (!categoryName) {
      return res.status(400).json({ message: "CategoryName is required" });
    }
    // Proceed with updating the entry
    const updatedEntry = await GalleryCategory.findByIdAndUpdate(
      { _id: req.params.id },
      {
        categoryName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedEntry, "ue");
    return res
      .status(200)
      .json({ message: "Category entry updated successfully", updatedEntry });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/galleryCategory/:id", async (req, res) => {
  try {
    const deletedEntry = await GalleryCategory.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//add countries code
const countries = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
  // Add more countries as needed
];
router.get("/countries", (req, res) => {
  res.json(countries);
});
// blog content
router.post("/blog", upload.single("image"), async (req, res, next) => {
  try {
    console.log("in");
    const {
      title,
      authorId,
      categoryId,
      content,
      description,
      bannerCaption,
      featured,
    } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "File or filename is missing" });
    }

    // Convert 'featured' to a boolean
    const isFeatured = featured === "yes";

    const newBlog = new Blog({
      title,
      authorId,
      categoryId,
      content,
      image: image.path,
      featured: isFeatured,
      bannerCaption,
      description,
    });
    console.log(newBlog, "bl");
    await newBlog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ error: error.message });
  }
});
router.patch("/blog/:id", upload.single("image"), async (req, res, next) => {
  try {
    let editEntry = await Blog.findById(req.params.id);
    if (!editEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    const {
      title,
      authorId,
      categoryId,
      content,
      description,
      bannerCaption,
      featured,
    } = req.body;
    const image = req.file;
    let imagePath;
    if (image) {
      imagePath = image.path;
    } else if (editEntry.image) {
      imagePath = editEntry.image;
    } else {
      return res.status(400).json({ message: "File or filename is missing" });
    }

    const isFeatured = featured === "yes";
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        authorId,
        categoryId,
        content,
        image: imagePath,
        featured: isFeatured,
        bannerCaption,
        description,
      },
      { new: true, runValidators: true }
    );

    console.log(updated, "uee");
    return res.status(200).json(updated);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ error: error.message });
  }
});
router.get("/author", async (req, res, next) => {
  try {
    const getAuthors = await Author.find({});
    // console.log(getAuthors);
    return res.status(200).json(getAuthors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.get("/category", async (req, res, next) => {
  try {
    const getCategories = await BlogCategory.find({});
    // console.log(getCategories);
    return res.status(200).json(getCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/api/uploadUrl", async (req, res) => {
  try {
    const { url } = req.body;

    // Upload image to Cloudinary
    cloudinary.uploader.upload(
      url,
      { folder: "CMS", use_filename: true },
      (error, result) => {
        if (error) {
          console.error("Error uploading image to Cloudinary:", error);
          res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary" });
        } else {
          console.log("Image uploaded to Cloudinary:", result);
          res.json({
            success: 1,
            file: {
              url: result.secure_url,
            },
          });
          console.log(result, "res");
        }
      }
    );
  } catch (error) {
    console.error("Error processing image upload request:", error);
    res.status(400).json({ error: "Error processing image upload request" });
  }
});
router.get("/blog", async (req, res) => {
  try {
    const getBlogs = await Blog.find().sort("-updatedAt");
    return res.status(200).json(getBlogs);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post("/author", async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const addAuthor = new Author({
      firstName: capitalizedFirstName,
      lastName: capitalizedLastName,
    });

    await addAuthor.save();
    console.log(addAuthor);

    return res.status(200).json(addAuthor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/category", async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const capitalized =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const addCategory = new BlogCategory({
      categoryName: capitalized,
    });

    await addCategory.save();
    console.log(addCategory);

    return res.status(200).json(addCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    // Upload file to Cloudinary
    const file = req.file;
    console.log(file);
    if (!file) {
      return res.status(400).json({ message: "File or filename is missing" });
    }
    const result = file.path;
    console.log(result);
    res.json({ success: 1, file: { url: result } });
    // await cloudinary.v2.uploader.upload(file.path,function(res,err){console.log(res,err)});
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

router.get("/blog/:id", async (req, res, next) => {
  try {
    const get = await Blog.findById(req.params.id);
    // console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.patch("/author/:id", async (req, res) => {
  try {
    let { firstName, lastName } = req.body;
    const existingEntry = await Author.findById(req.params.id);
    if (!existingEntry) {
      return res.status(400).json({
        message: "Author Entry Not Found",
      });
    }
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "FirstName,LastName is required" });
    }
    // Proceed with updating the entry
    const updatedEntry = await Author.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedEntry, "ue");
    return res
      .status(200)
      .json({ message: "Author entry updated successfully", updatedEntry });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.patch("/category/:id", async (req, res) => {
  try {
    let { categoryName } = req.body;
    const existingEntry = await BlogCategory.findById(req.params.id);
    if (!existingEntry) {
      return res.status(400).json({
        message: "Blog Category Not Found",
      });
    }
    if (!categoryName) {
      return res.status(400).json({ message: "CategoryName is required" });
    }
    // Proceed with updating the entry
    const updatedEntry = await BlogCategory.findByIdAndUpdate(
      { _id: req.params.id },
      {
        categoryName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedEntry, "ue");
    return res
      .status(200)
      .json({ message: "Category entry updated successfully", updatedEntry });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      console.log(errors, "er");
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/author/:id", async (req, res) => {
  try {
    const deletedEntry = await Author.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/category/:id", async (req, res) => {
  try {
    const deletedEntry = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//get by id
router.get("/author/:id", async (req, res) => {
  try {
    const get = await Author.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/category/:id", async (req, res) => {
  try {
    const get = await BlogCategory.findById(req.params.id);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//get featured blogs latest in main panel
router.get("/featured", async (req, res) => {
  try {
    console.log("in");
    const get = await Blog.find({ featured: true }).sort("-updatedAt").limit(4);
    console.log(get);
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/dataAdd", upload.array('images'),async(req, res)=> {
  try {
    console.log('in')
    const images = req.files.map(file => file.path)
    console.log(images, 'img')
    if (images.length === 0) {
      return res.status(400).json({ message: 'no files uploaded' })
    }
    const add = new Data({
      title:req.body.title,
      description:req.body.description,
      subtitle:req.body.description,
      images:images,
      number:req.body.number,
      faqId:req.body.faqId
    })
    await add.save()
    console.log(add)
    return res.status(201).json({message:'Data Added successfully',add})
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {}
      for (let field in error.errors) {
        errors[field]=error.errors[field].message
      }
      return res.status(400).json({errors})
    }
    return res.status(500).json({message:error.message})
    
  }
}) 

router.get("/dataAdd", async (req, res) => {
  try {
    console.log("in");
    const get = await Data.find({})
    console.log(get,'get');
    return res.status(200).json(get);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//get all blogs list
const fileUpload = require("express-fileupload");
const GalleryCategory = require("../models/galleryCategory");
const Todo = require("../models/todo");
router.use(
  fileUpload({
    createParentPath: true, // Ensure the parent directory exists
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size (adjust as necessary)
    },
  })
);
router.delete("/blog/:id", async (req, res) => {
  try {
    const deletedEntry = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/upload", async (req, res) => {
  try {
    // Check if there are files uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    // Access the uploaded file
    const uploadedFile = req.files.file;
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${uploadedFile.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("todo")
      .upload(uniqueFilename, uploadedFile.data);

    // Handle errors during file upload
    if (error) {
      console.error("Error uploading file:", error.message);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    // Construct the public URL of the uploaded file
    // const timestamp = Date.now();

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/todo/${uniqueFilename}`;

    // Log success and return the public URL
    console.log("File uploaded successfully:", publicUrl);
    return res.json({ success: 1, file: { url: publicUrl } });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return res.status(500).json({ error: "Failed to upload file" });
  }
});
router.post("/todoadd", async (req, res) => {
  try {
    console.log("in");
    const { title, description, todoStatus } = req.body;
    const file = req.files.file;
    console.log(file);
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${file.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("todo")
      .upload(uniqueFilename, file.data);
    console.log(data, error, "------");

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/todo/${uniqueFilename}`;

    // Log success and return the public URL
    console.log("File uploaded successfully:", publicUrl);

    // If file upload succeeds, attempt to create a new todo
    const addTodo = await Todo.create({
      title,
      description,
      file: publicUrl,
      todoStatus,
    });

    console.log(addTodo);

    // Return success response
    res.status(200).json({ message: "Todo added successfully", todo: addTodo });
  } catch (error) {
    // Catch any other errors that may occur during the process
    console.error("Internal server error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.patch("/", async (req, res) => {
  try {
  } catch (error) {}
});
router.post("/managerStatus", async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(id, "id");
    // const status = req.body;
    const editTodo = await Todo.findByIdAndUpdate(
      id,
      { status },
      { new: true, update: true }
    );
    console.log(editTodo);
    return res.status(200).json({
      message: "Todo status updated successfully by manager",
      editTodo,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post("/manageraddTodo", async (req, res) => {
  try {
    const { title, description, todoStatus } = req.body;
  } catch (error) {}
});
//data add data for integration and practice

module.exports = router;
