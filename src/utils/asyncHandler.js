const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'internal server error',
      errors: error.errors || [],
    });
  }
};

export default asyncHandler;
