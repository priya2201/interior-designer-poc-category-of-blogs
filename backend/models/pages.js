const mongoose = require("mongoose");
const { Schema } = mongoose;
const pageSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    image:{
      type:Schema.Types.String
    }
    
  },
  { timestamps: true }
);
const Page = mongoose.model("Page", pageSchema);
module.exports =Page;
