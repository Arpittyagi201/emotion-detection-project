const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const fileFilter = (allowedMimes) => (req, file, cb) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const audioUpload = multer({
  storage,
  fileFilter: fileFilter(["audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp3", "audio/webm"]),
  limits: { fileSize: 10 * 1024 * 1024 } 
});

const imageUpload = multer({
  storage,
  fileFilter: fileFilter(["image/jpeg", "image/png", "image/jpg"]),
  limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = {
  audioUpload,
  imageUpload
};

