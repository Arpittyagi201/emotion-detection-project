const fs = require("fs");
const Detection = require("../models/Detection");
const { analyzeText, analyzeVoice, analyzeImage } = require("../services/pythonService");

// POST /api/detection/text
const detectFromText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ success: false, message: "Text input is required" });
    }

    const result = await analyzeText(text.trim());

    const detection = await Detection.create({
      user: req.user.id,
      type: "text",
      inputReference: text.slice(0, 120),
      status: result.status,
      confidence: result.confidence,
      rawResponse: result.raw
    });

    res.json({
      success: true,
      data: {
        status: detection.status,
        confidence: detection.confidence,
        detectionId: detection._id,
        createdAt: detection.createdAt,
        raw: detection.rawResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/detection/voice
const detectFromVoice = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: "Audio file is required" });
  }

  try {
    const result = await analyzeVoice(file.path);

    const detection = await Detection.create({
      user: req.user.id,
      type: "voice",
      inputReference: file.filename,
      status: result.status,
      confidence: result.confidence,
      rawResponse: result.raw
    });

    res.json({
      success: true,
      data: {
        status: detection.status,
        confidence: detection.confidence,
        detectionId: detection._id,
        createdAt: detection.createdAt,
        raw: detection.rawResponse
      }
    });
  } catch (error) {
    next(error);
  } finally {
    // Clean up local file after sending to Python service
    try {
      fs.unlink(file.path, () => {});
    } catch (cleanupError) {
      // ignore
    }
  }
};

// POST /api/detection/image
const detectFromImage = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  try {
    const result = await analyzeImage(file.path);

    const detection = await Detection.create({
      user: req.user.id,
      type: "image",
      inputReference: file.filename,
      status: result.status,
      confidence: result.confidence,
      rawResponse: result.raw
    });

    res.json({
      success: true,
      data: {
        status: detection.status,
        confidence: detection.confidence,
        detectionId: detection._id,
        createdAt: detection.createdAt,
        raw: detection.rawResponse
      }
    });
  } catch (error) {
    next(error);
  } finally {
    // Clean up local file after sending to Python service
    try {
      fs.unlink(file.path, () => {});
    } catch (cleanupError) {
      // ignore
    }
  }
};

// GET /api/detection/history
const getDetectionHistory = async (req, res, next) => {
  try {
    const history = await Detection.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  detectFromText,
  detectFromVoice,
  detectFromImage,
  getDetectionHistory
};

