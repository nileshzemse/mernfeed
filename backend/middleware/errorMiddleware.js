const notFound = (req, res, next) => {
  // throw new Error(`Not Found ${req.originalUrl}`);
  // above line can also work, but we want to send custom error message and custom status code 404, this can be done by passing error in next like below

  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export { notFound, errHandler };
