// Zod schemas for request validation

import { z } from 'zod';

// Schema for user signup validation
export const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'), // Name must be at least 3 characters
  email: z.string().email('Invalid email address'), // Email must be a valid email format
  password: z.string().min(6, 'Password must be at least 6 characters'), // Password must be at least 6 characters
});

// Schema for user login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'), // Email must be a valid email format
  password: z.string().min(6, 'Password must be at least 6 characters'), // Password must be at least 6 characters
});

// Schema for email verification validation
export const verifyEmailSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 characters'), // Verification code must be exactly 6 characters
});

// Schema for forgot password validation
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'), // Email must be a valid email format
});

// Schema for reset password validation
export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'), // Password must be at least 6 characters
});
