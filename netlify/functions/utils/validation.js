/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize string input to prevent injection attacks
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<script[^>]*>.*?<\/script>/gi, '').substring(0, 1000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (!email) return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate and format phone number
 */
function validatePhone(phone) {
  if (!phone) return { valid: false, error: 'Phone number is required' };

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Check if it's a valid US phone number (10 or 11 digits)
  if (digits.length === 10) {
    return { valid: true, formatted: `+1${digits}` };
  } else if (digits.length === 11 && digits[0] === '1') {
    return { valid: true, formatted: `+${digits}` };
  }

  return { valid: false, error: 'Please provide a valid US phone number' };
}

/**
 * Validate quote request data
 */
function validateQuoteRequest(data) {
  const errors = [];

  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.valid) {
    errors.push(phoneValidation.error);
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.serviceType || data.serviceType.trim().length === 0) {
    errors.push('Service type is required');
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.push('Address must be at least 5 characters');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Return sanitized data
  return {
    valid: true,
    data: {
      name: sanitizeString(data.name),
      phone: phoneValidation.formatted,
      email: data.email ? sanitizeString(data.email) : '',
      serviceType: sanitizeString(data.serviceType),
      address: sanitizeString(data.address),
      details: sanitizeString(data.details || '')
    }
  };
}

module.exports = {
  sanitizeString,
  isValidEmail,
  validatePhone,
  validateQuoteRequest
};
