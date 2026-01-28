/**
 * Netlify Function: Submit Quote Request
 * Handles quote form submissions with email and SMS notifications
 */

const { validateQuoteRequest } = require('./utils/validation');
const { sendBusinessEmail, sendCustomerEmail } = require('./utils/sendgrid');
const { sendBusinessSMS, sendCustomerSMS } = require('./utils/twilio');

// Rate limiting: Simple in-memory store (resets when function cold-starts)
const rateLimitStore = new Map();
const MAX_REQUESTS_PER_HOUR = parseInt(process.env.MAX_REQUESTS_PER_HOUR || '20', 10);

/**
 * Check rate limiting
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const hourAgo = now - 3600000; // 1 hour in milliseconds

  // Clean up old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.timestamp < hourAgo) {
      rateLimitStore.delete(key);
    }
  }

  // Check current IP
  const record = rateLimitStore.get(ip);
  if (record) {
    if (record.count >= MAX_REQUESTS_PER_HOUR) {
      return false; // Rate limit exceeded
    }
    record.count++;
    record.timestamp = now;
  } else {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
  }

  return true;
}

/**
 * Main handler
 */
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Rate limiting
    const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(ip)) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Too many requests. Please try again later.'
        })
      };
    }

    // Parse request body
    const data = JSON.parse(event.body);

    // Validate input
    const validation = validateQuoteRequest(data);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Validation failed',
          details: validation.errors
        })
      };
    }

    const quoteData = validation.data;

    // Send notifications in parallel with graceful degradation
    const notifications = [
      sendBusinessSMS(quoteData).catch(err => ({ error: 'Business SMS failed', details: err.message })),
      sendCustomerSMS(quoteData).catch(err => ({ error: 'Customer SMS failed', details: err.message })),
      sendBusinessEmail(quoteData).catch(err => ({ error: 'Business email failed', details: err.message })),
      sendCustomerEmail(quoteData).catch(err => ({ error: 'Customer email failed', details: err.message }))
    ];

    const results = await Promise.all(notifications);

    // Check if at least one notification succeeded
    const failures = results.filter(r => r && r.error);
    const successes = results.length - failures.length;

    if (successes === 0) {
      // All notifications failed
      console.error('All notifications failed:', failures);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Failed to send notifications. Please call us at (828) 279-1948.',
          details: failures
        })
      };
    }

    // At least one notification succeeded
    if (failures.length > 0) {
      console.warn('Some notifications failed:', failures);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Quote request received! We will contact you within 2 hours.',
        notifications: {
          sent: successes,
          failed: failures.length
        }
      })
    };

  } catch (error) {
    console.error('Error processing quote request:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'An error occurred processing your request. Please call us at (828) 279-1948.',
        details: error.message
      })
    };
  }
};
