const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Geolocation Schema
const geoSchema = new Schema({
  type: { type: String },
  coordinates: { type: [Number], index: "2dsphere" },
});

// Member Schema and Model
const memberSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  role: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  location: geoSchema,
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
