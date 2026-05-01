const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["text", "voice", "image"],
      required: true
    },
    inputReference: {
      type: String,
      default: null
    },
    status: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      default: null
    },
    rawResponse: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Detection", detectionSchema);

