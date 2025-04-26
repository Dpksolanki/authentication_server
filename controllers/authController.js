import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { generateJWTToken } from '../utils/generateJWTToken.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../resend/email.js';

// User Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    await sendVerificationEmail(user.email, verificationToken);
    generateJWTToken(res, user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: 'Email not verified' });
    }

    generateJWTToken(res, user._id);
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired code' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${token}`);
    res.status(200).json({ success: true, message: 'Reset email sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check Authenticated User
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


