import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.isActive) {
      return sendError(res, 401, 'Invalid email or password.');
    }

    if (user.isLocked) {
      return sendError(res, 423, 'Account is temporarily locked due to too many failed login attempts.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incLoginAttempts();
      return sendError(res, 401, 'Invalid email or password.');
    }

    await user.resetLoginAttempts();
    const token = generateToken(user._id);

    return sendSuccess(res, 200, 'Login successful', {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return sendError(res, 403, 'Admin user already exists.');
    }

    const user = new User({ username, email, password, role: 'admin' });
    await user.save();

    const token = generateToken(user._id);
    return sendSuccess(res, 201, 'Admin user created successfully', {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    return sendSuccess(res, 200, 'User fetched', {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const logout = (_req, res) => sendSuccess(res, 200, 'Logged out successfully.');