
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};

