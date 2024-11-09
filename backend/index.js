const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { createCanvas } = require("canvas");
const Barcode = require("jsbarcode");
const cors = require("cors");
const router = require("./controllers/index");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use("/interior", router);
app.get("/", (req, res) => {
  res.send("helloo");
});
app.get("/barcode/:text", (req, res) => {
  const canvas = createCanvas();
  Barcode(canvas, req.params.text, {
    format: "CODE128",
    displayValue: true,
    fontSize: 18,
    textMargin: 10,
  });

  res.type("image/png");
  const stream = canvas.createPNGStream();
  stream.pipe(res);
});
let port = 7000;
async function start() {
  try {
    await mongoose.connect(
      // "mongodb+srv://admin:admin@cluster0.s3icvpv.mongodb.net/cms_interior?retryWrites=true&w=majority"
      "mongodb://localhost:27017/cms_interior"
    );

    console.log(`Mongodb connected with server`);

    app.listen(port, () => {
      console.log("Server listening...");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

start();
