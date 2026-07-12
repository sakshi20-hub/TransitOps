<<<<<<< HEAD
export {}
=======

import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Not authorized, no token provided');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      const error = new Error('Not authorized, malformed token');
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded is expected to carry { id, role, iat, exp }
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
>>>>>>> origin/main
