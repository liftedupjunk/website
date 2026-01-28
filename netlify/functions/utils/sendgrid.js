/**
 * SendGrid email integration
 */

const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email notification to business
 */
async function sendBusinessEmail(quoteData) {
  const { name, phone, email, serviceType, address, details } = quoteData;

  const msg = {
    to: process.env.BUSINESS_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New Quote Request from ${name}`,
    text: `
New Quote Request Received

Customer Information:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not provided'}
- Service Type: ${serviceType}
- Address: ${address}
- Additional Details: ${details || 'None provided'}

IMPORTANT: Contact customer within 2 hours as promised.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
    .label { font-weight: bold; color: #FF6B35; }
    .urgent { background: #fff3cd; border-left: 4px solid #FF6B35; padding: 15px; margin: 20px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">🚀 New Quote Request</h2>
    </div>
    <div class="content">
      <div class="urgent">
        <strong>⏰ Action Required:</strong> Contact customer within 2 hours as promised on website.
      </div>

      <h3>Customer Information</h3>
      <div class="field">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Phone:</span> <a href="tel:${phone}">${phone}</a>
      </div>
      <div class="field">
        <span class="label">Email:</span> ${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Service Type:</span> ${serviceType}
      </div>
      <div class="field">
        <span class="label">Address:</span> ${address}
      </div>
      ${details ? `<div class="field">
        <span class="label">Additional Details:</span><br>
        ${details}
      </div>` : ''}
    </div>
  </div>
</body>
</html>
    `.trim()
  };

  await sgMail.send(msg);
}

/**
 * Send confirmation email to customer
 */
async function sendCustomerEmail(quoteData) {
  const { name, email, serviceType } = quoteData;

  if (!email) {
    // Email is optional, skip if not provided
    return;
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Quote Request Received - Lifted Up Junk',
    text: `
Hi ${name},

Thank you for requesting a quote from Lifted Up Junk!

We've received your request for ${serviceType} and will contact you within 2 hours to discuss your needs and provide a free estimate.

In the meantime, if you have any questions, feel free to call us at (828) 279-1948.

Best regards,
Lifted Up Junk Team
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Quote Request Received!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for requesting a quote from <strong>Lifted Up Junk</strong>!</p>

      <p>We've received your request for <strong>${serviceType}</strong> and will contact you <strong>within 2 hours</strong> to discuss your needs and provide a free estimate.</p>

      <p>In the meantime, if you have any questions, feel free to call us:</p>

      <p style="text-align: center;">
        <a href="tel:+18282791948" class="button">📞 Call (828) 279-1948</a>
      </p>

      <p>We look forward to serving you!</p>

      <p>Best regards,<br>
      <strong>Lifted Up Junk Team</strong></p>
    </div>
    <div class="footer">
      <p>Lifted Up Junk - Professional Junk Removal Services<br>
      Atlanta, GA | (828) 279-1948</p>
    </div>
  </div>
</body>
</html>
    `.trim()
  };

  await sgMail.send(msg);
}

module.exports = {
  sendBusinessEmail,
  sendCustomerEmail
};
