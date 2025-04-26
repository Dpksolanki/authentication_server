import express from 'express';
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  checkAuth
} from '../controllers/authController.js';

import {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/authValidators.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Route for user signup with validation
router.post('/signup', validateRequest(signupSchema), signup);

// Route for user login with validation
router.post('/login', validateRequest(loginSchema), login);

// Route for requesting a password reset with validation
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);

// Route for resetting password with validation
router.post('/reset-password/:token', validateRequest(resetPasswordSchema), resetPassword);

// Route for checking authenticated user status
router.get('/check-auth', verifyToken, checkAuth);

// Route for verifying user email
router.post('/verify-email', validateRequest(verifyEmailSchema), verifyEmail);

// Route for user logout
router.post('/logout', logout);

export default router;
