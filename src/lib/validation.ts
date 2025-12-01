import type { ValidationError } from '../types';

// Validation rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  username: 'Username must be 3-20 characters (letters, numbers, _, -)',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  match: (field: string) => `Must match ${field}`,
} as const;

// Validation functions
export const validateEmail = (email: string): string | null => {
  if (!email) return VALIDATION_MESSAGES.required;
  if (!VALIDATION_RULES.email.test(email)) return VALIDATION_MESSAGES.email;
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return VALIDATION_MESSAGES.required;
  if (!VALIDATION_RULES.password.test(password)) return VALIDATION_MESSAGES.password;
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return VALIDATION_MESSAGES.required;
  if (!VALIDATION_RULES.username.test(username)) return VALIDATION_MESSAGES.username;
  return null;
};

export const validateRequired = (value: string, fieldName?: string): string | null => {
  if (!value || value.trim() === '') {
    return fieldName ? `${fieldName} is required` : VALIDATION_MESSAGES.required;
  }
  return null;
};

export const validateMinLength = (value: string, min: number): string | null => {
  if (value.length < min) return VALIDATION_MESSAGES.minLength(min);
  return null;
};

export const validateMaxLength = (value: string, max: number): string | null => {
  if (value.length > max) return VALIDATION_MESSAGES.maxLength(max);
  return null;
};

export const validateUrl = (url: string, required = false): string | null => {
  if (!url) return required ? VALIDATION_MESSAGES.required : null;
  if (!VALIDATION_RULES.url.test(url)) return VALIDATION_MESSAGES.url;
  return null;
};

export const validatePasswordConfirmation = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return VALIDATION_MESSAGES.required;
  if (password !== confirmPassword) return VALIDATION_MESSAGES.match('password');
  return null;
};

// Form validation helpers
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field as keyof T];
    const value = data[field as keyof T];
    const error = rule(value);
    
    if (error) {
      errors.push({
        field: field as string,
        message: error,
      });
    }
  });
  
  return errors;
};

export const getFieldError = (errors: ValidationError[], field: string): string | null => {
  const error = errors.find((err) => err.field === field);
  return error?.message || null;
};

export const hasFieldError = (errors: ValidationError[], field: string): boolean => {
  return errors.some((err) => err.field === field);
};

// Specific form validators
export const validateLoginForm = (data: { email: string; password: string }): ValidationError[] => {
  return validateForm(data, {
    email: validateEmail,
    password: (value) => validateRequired(value, 'Password'),
  });
};

export const validateRegisterForm = (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}): ValidationError[] => {
  const errors = validateForm(data, {
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    confirmPassword: (value) => validatePasswordConfirmation(data.password, value),
    firstName: (value) => value ? validateMinLength(value, 1) : null,
    lastName: (value) => value ? validateMinLength(value, 1) : null,
  });
  
  return errors;
};

export const validateProfileForm = (data: {
  firstName?: string;
  lastName?: string;
  username: string;
}): ValidationError[] => {
  return validateForm(data, {
    username: validateUsername,
    firstName: (value) => value ? validateMinLength(value, 1) : null,
    lastName: (value) => value ? validateMinLength(value, 1) : null,
  });
};