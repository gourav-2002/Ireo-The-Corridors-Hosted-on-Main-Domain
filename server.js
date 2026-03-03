import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 4000;

// SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'claret.herosite.pro',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL/TLS
  auth: {
    user: process.env.SMTP_USER || 'explore@corridorsireo.com',
    pass: process.env.SMTP_PASS,
  },
});

// ── HTML EMAIL TEMPLATES ──────────────────────────────────────────────────────

/**
 * Email sent TO THE ADMIN (explore@corridorsireo.com)
 * Notifies that a new enquiry has been submitted.
 */
function adminEmailHTML({ name, email, phone, budget, message }) {
  const messageRow = message
    ? `<tr>
        <td style="padding:8px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;width:130px;vertical-align:top;">Message</td>
        <td style="padding:8px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">${message}</td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry – Ireo The Corridors</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9;padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f1c2e;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#c9a84c;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Ireo The Corridors</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Georgia,serif;font-weight:normal;">New Enquiry Received</h1>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background:#c9a84c;padding:12px 40px;text-align:center;">
              <p style="margin:0;color:#0f1c2e;font-size:13px;font-weight:bold;font-family:Arial,sans-serif;letter-spacing:0.5px;">
                A new lead has been submitted through the website contact form.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#444;font-family:Arial,sans-serif;">
                Here are the details of the enquiry:
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #eee;">
                <tr>
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;width:130px;vertical-align:top;">Full Name</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">${name}</td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;vertical-align:top;">Email</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">
                    <a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;vertical-align:top;">Phone</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">
                    <a href="tel:${phone}" style="color:#c9a84c;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;vertical-align:top;">Budget</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">${budget || 'Not specified'}</td>
                </tr>
                ${messageRow}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;background:#c9a84c;color:#0f1c2e;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:14px 32px;border-radius:50px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;border-top:1px solid #eee;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;">
                Ireo The Corridors &mdash; Sector 67A, Golf Course Extension Road, Gurgaon<br />
                This is an automated notification from your website.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Email sent TO THE USER (thank you confirmation)
 */
function userEmailHTML({ name }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You – Ireo The Corridors</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9;padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f1c2e;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:#c9a84c;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Ireo The Corridors</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-family:Georgia,serif;font-weight:normal;line-height:1.3;">
                Thank You, ${name}!
              </h1>
              <p style="margin:12px 0 0;color:rgba(255,255,255,0.65);font-size:14px;font-family:Arial,sans-serif;">
                We've received your enquiry and will be in touch shortly.
              </p>
            </td>
          </tr>

          <!-- Gold Divider -->
          <tr>
            <td style="background:#c9a84c;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
                Dear <strong style="color:#0f1c2e;">${name}</strong>,
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
                Thank you for your interest in <strong style="color:#0f1c2e;">Ireo The Corridors</strong>. Your enquiry has been successfully submitted. One of our expert property advisors will reach out to you within <strong style="color:#0f1c2e;">24 hours</strong> with verified pricing, availability, and complete project details.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
                Meanwhile, feel free to reach us directly:
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f7f2;border-radius:8px;padding:20px 24px;margin-bottom:32px;">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">📞</td>
                        <td style="font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;">
                          <a href="tel:+919899888015" style="color:#0f1c2e;text-decoration:none;font-weight:600;">+91 98998 88015</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">✉️</td>
                        <td style="font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;">
                          <a href="mailto:explore@corridorsireo.com" style="color:#c9a84c;text-decoration:none;font-weight:600;">explore@corridorsireo.com</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">📍</td>
                        <td style="font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;">
                          Sector 67A, Golf Course Extension Road, Gurgaon
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://corridorsireo.com" style="display:inline-block;background:#c9a84c;color:#0f1c2e;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:14px 36px;border-radius:50px;letter-spacing:0.5px;">
                      Explore Ireo The Corridors
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f1c2e;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">
                &copy; 2025 Ireo The Corridors &mdash; Sector 67A, Gurgaon
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;line-height:1.6;">
                We are an independent channel partner for Ireo The Corridors and not the official developer website.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ── API ROUTE ─────────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, budget, message } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  try {
    // 1. Send notification email to admin
    await transporter.sendMail({
      from: `"Ireo The Corridors" <${process.env.SMTP_USER || 'explore@corridorsireo.com'}>`,
      to: process.env.ADMIN_EMAIL || 'explore@corridorsireo.com',
      subject: `New Enquiry from ${name} – Ireo The Corridors`,
      html: adminEmailHTML({ name, email, phone, budget, message }),
    });

    // 2. Send thank-you confirmation email to user
    await transporter.sendMail({
      from: `"Ireo The Corridors" <${process.env.SMTP_USER || 'explore@corridorsireo.com'}>`,
      to: email,
      subject: 'Thank You for Your Enquiry – Ireo The Corridors',
      html: userEmailHTML({ name }),
    });

    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// ── BROCHURE EMAIL TEMPLATES ──────────────────────────────────────────────────

const BROCHURE_PDF_URL = 'https://dobighazam.in/wp-content/uploads/2026/02/Brochure-ireo-corridors.pdf';

/**
 * Email sent TO THE ADMIN when someone requests the brochure.
 */
function adminBrochureEmailHTML({ name, email, phone }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Brochure Download Request – Ireo The Corridors</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9;padding:30px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f1c2e;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#c9a84c;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Ireo The Corridors</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Georgia,serif;font-weight:normal;">Brochure Download Request</h1>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background:#c9a84c;padding:12px 40px;text-align:center;">
              <p style="margin:0;color:#0f1c2e;font-size:13px;font-weight:bold;font-family:Arial,sans-serif;letter-spacing:0.5px;">
                A new lead has requested the project brochure.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#444;font-family:Arial,sans-serif;">
                Here are the details of the request:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #eee;">
                <tr>
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;width:130px;vertical-align:top;">Full Name</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">${name}</td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;vertical-align:top;">Email</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">
                    <a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                  <td style="padding:12px 0;font-size:14px;color:#666;font-family:Arial,sans-serif;vertical-align:top;">Phone</td>
                  <td style="padding:12px 0;font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;font-weight:600;vertical-align:top;">
                    <a href="tel:${phone}" style="color:#c9a84c;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;background:#c9a84c;color:#0f1c2e;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:14px 32px;border-radius:50px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;border-top:1px solid #eee;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;">
                Ireo The Corridors &mdash; Sector 67A, Golf Course Extension Road, Gurgaon<br />
                This is an automated notification from your website.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Email sent TO THE USER with the brochure download link.
 */
function userBrochureEmailHTML({ name }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Brochure – Ireo The Corridors</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9;padding:30px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f1c2e;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:#c9a84c;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Ireo The Corridors</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-family:Georgia,serif;font-weight:normal;line-height:1.3;">
                Your Brochure is Ready, ${name}!
              </h1>
              <p style="margin:12px 0 0;color:rgba(255,255,255,0.65);font-size:14px;font-family:Arial,sans-serif;">
                Thank you for your interest in Ireo The Corridors.
              </p>
            </td>
          </tr>

          <!-- Gold Divider -->
          <tr>
            <td style="background:#c9a84c;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
                Dear <strong style="color:#0f1c2e;">${name}</strong>,
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.7;font-family:Arial,sans-serif;">
                Your copy of the <strong style="color:#0f1c2e;">Ireo The Corridors</strong> project brochure is ready. Click the button below to download the complete brochure with floor plans, pricing details, amenities, and more.
              </p>

              <!-- Download CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td align="center">
                    <a href="${BROCHURE_PDF_URL}" target="_blank" style="display:inline-block;background:#c9a84c;color:#0f1c2e;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;padding:16px 44px;border-radius:50px;letter-spacing:0.5px;">
                      &#x2B07; Download Brochure (PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;font-size:13px;color:#999;font-family:Arial,sans-serif;text-align:center;">
                If the button doesn't work, copy and paste this link in your browser:
              </p>
              <p style="margin:0 0 32px;font-size:12px;text-align:center;font-family:Arial,sans-serif;">
                <a href="${BROCHURE_PDF_URL}" style="color:#c9a84c;word-break:break-all;">${BROCHURE_PDF_URL}</a>
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f7f2;border-radius:8px;padding:20px 24px;margin-bottom:8px;">
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;font-family:Arial,sans-serif;" colspan="2">
                    Have questions? Our advisors are here to help:
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">📞</td>
                        <td style="font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;">
                          <a href="tel:+919899888015" style="color:#0f1c2e;text-decoration:none;font-weight:600;">+91 98998 88015</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">✉️</td>
                        <td style="font-size:14px;color:#0f1c2e;font-family:Arial,sans-serif;">
                          <a href="mailto:explore@corridorsireo.com" style="color:#c9a84c;text-decoration:none;font-weight:600;">explore@corridorsireo.com</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f1c2e;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;">
                &copy; 2025 Ireo The Corridors &mdash; Sector 67A, Gurgaon
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;line-height:1.6;">
                We are an independent channel partner for Ireo The Corridors and not the official developer website.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ── BROCHURE API ROUTE ────────────────────────────────────────────────────────

app.post('/api/brochure', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  try {
    // 1. Notify admin
    await transporter.sendMail({
      from: `"Ireo The Corridors" <${process.env.SMTP_USER || 'explore@corridorsireo.com'}>`,
      to: process.env.ADMIN_EMAIL || 'explore@corridorsireo.com',
      subject: `Brochure Download Request from ${name} – Ireo The Corridors`,
      html: adminBrochureEmailHTML({ name, email, phone }),
    });

    // 2. Send brochure link to user
    await transporter.sendMail({
      from: `"Ireo The Corridors" <${process.env.SMTP_USER || 'explore@corridorsireo.com'}>`,
      to: email,
      subject: 'Your Ireo The Corridors Brochure – Download Now',
      html: userBrochureEmailHTML({ name }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Brochure email error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email API server running on http://localhost:${PORT}`);
});
