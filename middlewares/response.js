exports.sendSuccessResponse = (products, res, message, statusCode) => {
  res.status(statusCode).json({
    status: 'success',
    message: message,
    data: products,
  });
};

exports.sendErrorResponse = (res, errorMessage, statusCode, error = '') => {
  if (error.kind === 'ObjectId') {
    return res.status(statusCode).json({
      status: 'success',
      errorMessage: 'Invalid product Id',
    });
  }
  res.status(statusCode).json({
    status: 'success',
    errorMessage,
  });
};

exports.sendSuccessResponse = (user, res, message, statusCode) => {
  res.status(statusCode).json({
    status: 'success',
    message: message,
    data: user,
  });
};

exports.sendErrorResponse = (res, errorMessage, statusCode, error = '') => {
  if (error.kind === 'ObjectId') {
    return res.status(statusCode).json({
      status: 'success',
      errorMessage: 'Invalid user Id',
    });
  }
  res.status(statusCode).json({
    status: 'success',
    errorMessage,
  });
};
