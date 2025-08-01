export function errorHandler(err, req, res, next) {
    console.error('Unhandled Error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }
  
  export function notFoundHandler(req, res) {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found'
    });
  }
  