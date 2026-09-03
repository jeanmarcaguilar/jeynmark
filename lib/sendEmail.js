import nodemailer from 'nodemailer';

export async function sendContactEmail({ env, payload }) {
  try {
    const { name, email, subject, message } = payload;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        status: 400,
        body: { error: 'All fields are required' }
      };
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return {
        status: 400,
        body: { error: 'Invalid email address' }
      };
    }

    // Check for required environment variables
    if (!env.EMAIL_USER || !env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return {
        status: 500,
        body: { 
          error: 'Email service not configured. Please contact the administrator.' 
        }
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: env.EMAIL_USER,
      to: env.EMAIL_TO || env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from Portfolio</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          
          <div style="max-width: 600px; margin: 40px auto; background: #0d0d0d; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
            
            <!-- Header Section -->
            <div style="background: linear-gradient(135deg, #00FF9D 0%, #00cc7d 100%); padding: 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h1 style="margin: 0; color: #0a0a0a; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Message</h1>
              <p style="margin: 8px 0 0; color: #0a0a0a; font-size: 14px; opacity: 0.8;">From your portfolio contact form</p>
            </div>

            <!-- Content Section -->
            <div style="padding: 30px;">
              
              <!-- Sender Info Card -->
              <div style="background: linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%); border: 1px solid rgba(0, 255, 157, 0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                  <div>
                    <p style="margin: 0 0 6px; color: #00FF9D; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">From</p>
                    <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${name}</p>
                  </div>
                  <div>
                    <p style="margin: 0 0 6px; color: #00FF9D; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Email</p>
                    <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${email}</p>
                  </div>
                </div>
                <div>
                  <p style="margin: 0 0 6px; color: #00FF9D; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Subject</p>
                  <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${subject}</p>
                </div>
              </div>

              <!-- Message Card -->
              <div style="background: linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%); border: 1px solid rgba(0, 255, 157, 0.1); border-radius: 12px; padding: 24px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #00FF9D 0%, #00cc7d 100%);"></div>
                
                <h3 style="margin: 0 0 16px; color: #00FF9D; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Message
                </h3>
                
                <p style="margin: 0; color: #e0e0e0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>

            </div>

            <!-- Footer Section -->
            <div style="background: #0a0a0a; padding: 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <p style="margin: 0 0 8px; color: #666; font-size: 12px;">This message was sent from your portfolio contact form</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                <div style="width: 4px; height: 4px; background: #00FF9D; border-radius: 50%;"></div>
                <p style="margin: 0; color: #00FF9D; font-size: 11px; font-weight: 500;">Portfolio Contact System</p>
                <div style="width: 4px; height: 4px; background: #00FF9D; border-radius: 50%;"></div>
              </div>
            </div>

          </div>

        </body>
        </html>
      `,
      text: `
New Message from Portfolio

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      status: 200,
      body: { 
        success: true, 
        message: 'Email sent successfully' 
      }
    };

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      status: 500,
      body: { 
        error: 'Failed to send email. Please try again later.' 
      }
    };
  }
}