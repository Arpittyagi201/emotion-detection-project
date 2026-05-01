const express = require("express");
const {
  detectFromText,
  detectFromVoice,
  detectFromImage,
  getDetectionHistory
} = require("../controllers/detectionController");
const authMiddleware = require("../middleware/authMiddleware");
const { audioUpload, imageUpload } = require("../middleware/uploadMiddleware");

const router = express.Router();

// All detection routes require authentication
router.post("/text", authMiddleware, detectFromText);
router.post("/voice", authMiddleware, audioUpload.single("file"), detectFromVoice);
router.post("/image", authMiddleware, imageUpload.single("file"), detectFromImage);
router.get("/history", authMiddleware, getDetectionHistory);

module.exports = router;

