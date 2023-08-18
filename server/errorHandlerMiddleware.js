const errorHandlerMiddleware = (err, req, res, next) => {
  // TODO: Implement the error-handling middleware function
  res.status(500).send('Internal Server Error!') 
};

module.exports = errorHandlerMiddleware;
