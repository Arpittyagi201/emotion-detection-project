const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const http = axios.create({
  // Slightly above 10 seconds to give remote Render instance time to warm up,
  // while still enforcing a strict upper bound for caller experience.
  timeout: 15000
});

const normalizePrediction = (data) => {
  if (!data || typeof data !== "object") {
    return { status: "Unknown", confidence: null, raw: data };
  }

  const status =
    data.status ||
    data.label ||
    data.emotion ||
    data.prediction ||
    (data.result && (data.result.status || data.result.label || data.result.emotion)) ||
    "Unknown";

  const confidence =
    data.confidence ||
    data.score ||
    (data.result && (data.result.confidence || data.result.score)) ||
    null;

  return { status, confidence, raw: data };
};

const analyzeText = async (text) => {
  const baseUrl =
    process.env.PYTHON_TEXT_API || `${process.env.PYTHON_URI || ""}`.replace(/\/docs$/, "/emotion_text");

  if (!baseUrl) {
    throw new Error("PYTHON_TEXT_API is not configured");
  }

  const url = `${baseUrl}?text=${encodeURIComponent(text)}`;

  const response = await http.post(url);
  return normalizePrediction(response.data);
};

const analyzeVoice = async (filePath) => {
  const url =
    process.env.PYTHON_VOICE_API || `${process.env.PYTHON_URI || ""}`.replace(/\/docs$/, "/emotion_voice");

  if (!url) {
    throw new Error("PYTHON_VOICE_API is not configured");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await http.post(url, formData, {
    headers: formData.getHeaders()
  });

  return normalizePrediction(response.data);
};

const analyzeImage = async (filePath) => {
  const url =
    process.env.PYTHON_IMAGE_API ||
    `${process.env.PYTHON_URI || ""}`.replace(/\/docs$/, "/emotion_face");

  if (!url) {
    throw new Error("PYTHON_IMAGE_API is not configured");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await http.post(url, formData, {
    headers: formData.getHeaders()
  });

  return normalizePrediction(response.data);
};

module.exports = {
  analyzeText,
  analyzeVoice,
  analyzeImage
};

