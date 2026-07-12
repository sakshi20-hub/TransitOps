<<<<<<< HEAD
export {}
=======
import authService from './auth.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const { user, token } = await authService.registerUser({ name, email, password, role });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser({ email, password });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Current user fetched successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
};
>>>>>>> origin/main
