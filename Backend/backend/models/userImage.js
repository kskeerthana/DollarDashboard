const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = userImage = mongoose.model("Image", imgSchema);
