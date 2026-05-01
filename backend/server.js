const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Database
connectDB();

// Trust proxy (for Render / reverse proxies)
app.set("trust proxy", 1);

// CORS configuration
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools / same-origin
    if (origin === clientUrl || origin === "http://localhost:5173") {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(cors(corsOptions));

// Security middlewares
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use("/api", limiter);

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/detection", require("./routes/detectionRoutes"));

// In production, serve frontend build
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 404 & error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

