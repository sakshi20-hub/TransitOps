<<<<<<< HEAD
export {}
=======
import { HTTP_STATUS } from '../utils/constants.js';


export const validateRequest = (schema, source = 'body') => {
  if (!schema || typeof schema.validate !== 'function') {
    throw new Error(
      'validateRequest requires a schema object with a .validate() method (e.g. a Joi schema).'
    );
  }

  const VALID_SOURCES = ['body', 'params', 'query'];
  if (!VALID_SOURCES.includes(source)) {
    throw new Error(
      `validateRequest configured with invalid source '${source}'. Valid sources: ${VALID_SOURCES.join(', ')}`
    );
  }

  return (req, res, next) => {
    try {
      const { value, error } = schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const message = error.details
          ? error.details.map((detail) => detail.message).join(', ')
          : error.message;

        const validationError = new Error(message);
        validationError.statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
        throw validationError;
      }

      req[source] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
>>>>>>> origin/main
