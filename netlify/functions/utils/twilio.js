/**
 * Twilio SMS integration
 */

const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS notification to business
 */
async function sendBusinessSMS(quoteData) {
  const { name, phone, serviceType, address } = quoteData;

  const message = `🚀 NEW QUOTE REQUEST

${name}
${phone}
${serviceType}
${address}

Reply within 2 hours!`.trim();

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.BUSINESS_PHONE
  });
}

/**
 * Send confirmation SMS to customer
 */
async function sendCustomerSMS(quoteData) {
  const { phone, name } = quoteData;

  const message = `Hi ${name}! Thanks for requesting a quote from Lifted Up Junk. We received your request and will contact you within 2 hours. Questions? Call (828) 279-1948`.trim();

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });
}

module.exports = {
  sendBusinessSMS,
  sendCustomerSMS
};
