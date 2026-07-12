<<<<<<< HEAD
export {}
=======

import { ROLE_VALUES, HTTP_STATUS } from '../utils/constants.js';

export const rbacMiddleware = (...allowedRoles) => {
  // Fail fast at route-definition time if a typo'd role is passed in.
  const invalidRoles = allowedRoles.filter((role) => !ROLE_VALUES.includes(role));
  if (invalidRoles.length > 0) {
    throw new Error(
      `rbacMiddleware configured with invalid role(s): ${invalidRoles.join(', ')}. ` +
        `Valid roles are: ${ROLE_VALUES.join(', ')}`
    );
  }

  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        const error = new Error('Not authorized, no user context found');
        error.statusCode = HTTP_STATUS.UNAUTHORIZED;
        throw error;
      }

      if (!allowedRoles.includes(req.user.role)) {
        const error = new Error(
          `Forbidden: role '${req.user.role}' is not permitted to access this resource`
        );
        error.statusCode = HTTP_STATUS.FORBIDDEN;
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default rbacMiddleware;
>>>>>>> origin/main
