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
  const { name, email, password } = req.body; // Destructure the request body to extract user details
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user with the same email exists, return a 400 error
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken(); // Generate a unique verification token

    // Create a new user instance with the provided details
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 24 hours
    });

    await user.save(); // Save the new user to the database

    // Send a verification email to the user with the generated token
    await sendVerificationEmail(user.email, verificationToken);
    generateJWTToken(res, user._id); // Generate and set a JWT token in the response

    // Prepare user data to be sent in the response, excluding sensitive information
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    // Respond with a success message and the user data
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { userData },
    });
  } catch (error) {
    // Handle any errors that occur during the signup process
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body; // Destructure the request body to extract login credentials
  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });
    // Check if the user exists and if the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // If credentials are invalid, return a 400 error
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      // If not verified, return a 403 error
      return res.status(403).json({ success: false, message: 'Email not verified' });
    }

    // Generate and set a JWT token in the response
    generateJWTToken(res, user._id);
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
export const logout = async (req, res) => {
  // Clear the token cookie to log the user out
  res.clearCookie('token');
  // Respond with a success message
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { code } = req.body; // Destructure the request body to get the verification code
  try {
    // Find the user by the verification token and check if it hasn't expired
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // Ensure the token is still valid
    });

    if (!user) {
      // If the user is not found or the token is invalid/expired, return a 400 error
      return res.status(400).json({ success: false, message: 'Invalid or expired code' });
    }

    // Update the user's verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationTokenExpiresAt = undefined; // Clear the expiration date
    await user.save(); // Save the changes to the database

    // Send a welcome email to the user after successful verification
    await sendWelcomeEmail(user.email, user.name);
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    // Handle any errors that occur during the email verification process
    res.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body; // Destructure the request body to get the email
  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      // If the user is not found, return a 404 error
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate a reset password token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token; // Set the reset token
    user.resetPasswordExpiresAt = Date.now() + 3600000; // Token valid for 1 hour
    await user.save(); // Save the changes to the database

    // Send a password reset email to the user with the reset link
    await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${token}`);
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Reset email sent' });
  } catch (error) {
    // Handle any errors that occur during the password reset request
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params; // Get the reset token from the request parameters
  const { password } = req.body; // Destructure the request body to get the new password
  try {
    // Find the user by the reset password token and check if it hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Ensure the token is still valid
    });

    if (!user) {
      // If the user is not found or the token is invalid/expired, return a 400 error
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Hash the new password and update the user's password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpiresAt = undefined; // Clear the expiration date
    await user.save(); // Save the changes to the database

    // Send a success email to the user after password reset
    await sendResetSuccessEmail(user.email);
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    // Handle any errors that occur during the password reset process
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check Authenticated User
export const checkAuth = async (req, res) => {
  try {
    // Find the user by ID from the request (set by verifyToken middleware)
    const user = await User.findById(req.userId);
    if (!user) {
      // If the user is not found, return a 404 error
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Respond with the user data, excluding the password
    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    // Handle any errors that occur during the authentication check
    res.status(500).json({ success: false, message: error.message });
  }
};


