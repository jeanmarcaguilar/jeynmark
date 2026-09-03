import nodemailer from 'nodemailer';

// In-memory rate limiter cache: key -> timestamp of last email sent
const emailRateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes default

/**
 * Extract client IP address from HTTP request headers or socket.
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ips = String(forwarded).split(',');
    return ips[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1';
}

/**
 * Fetch public IP if running on localhost.
 */
async function fetchPublicIpFallback() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return data.ip || null;
    }
  } catch {
    // Silent fallback
  }
  return null;
}

/**
 * Perform IP Geolocation lookup and resolve public IP if local.
 */
export async function getApproximateLocation(req, rawIp) {
  // Check Vercel serverless headers
  const city = req.headers['x-vercel-ip-city'];
  const country = req.headers['x-vercel-ip-country'];
  const region = req.headers['x-vercel-ip-country-region'];

  if (city || country) {
    const parts = [decodeURIComponent(city || ''), decodeURIComponent(region || ''), decodeURIComponent(country || '')].filter(Boolean);
    return {
      ip: rawIp,
      location: parts.join(', '),
    };
  }

  let cleanIp = (rawIp || '').replace(/^::ffff:/, '');
  let isLocalhost = !cleanIp || cleanIp === '127.0.0.1' || cleanIp === '::1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.');

  let resolvedIp = cleanIp;

  // If testing on localhost, resolve public WAN IP for accurate testing
  if (isLocalhost) {
    const publicIp = await fetchPublicIpFallback();
    if (publicIp) {
      resolvedIp = publicIp;
    }
  }

  if (!resolvedIp || resolvedIp === '127.0.0.1' || resolvedIp === '::1') {
    return {
      ip: rawIp,
      location: 'Localhost / Internal Network',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`http://ip-api.com/json/${resolvedIp}?fields=status,country,regionName,city,isp`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        const parts = [data.city, data.regionName, data.country].filter(Boolean);
        const loc = parts.join(', ');
        const locationStr = data.isp ? `${loc} (${data.isp})` : loc;
        return {
          ip: isLocalhost ? `${resolvedIp} (Local Dev)` : resolvedIp,
          location: isLocalhost ? `${locationStr} [Local Dev]` : locationStr,
        };
      }
    }
  } catch {
    // Fall back gracefully
  }

  return {
    ip: isLocalhost ? `${resolvedIp} (Local Dev)` : resolvedIp,
    location: 'Local Network / Development',
  };
}

/**
 * Format session duration in human-readable text.
 */
export function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return 'Just arrived';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} second${secs === 1 ? '' : 's'}`;
  return `${mins} min${mins === 1 ? '' : 's'} ${secs} sec${secs === 1 ? '' : 's'}`;
}

/**
 * Render clean HTML email for visitor alert.
 */
export function buildVisitorEmailHtml(data) {
  const {
    ip,
    location,
    deviceType,
    iphoneModel,
    os,
    browser,
    screenResolution,
    referrer,
    pageVisited,
    visitTime,
    sessionDurationText,
  } = data;

  const deviceDisplay = iphoneModel
    ? `${deviceType} (${iphoneModel !== 'Unknown' ? iphoneModel : 'iPhone/iPad - Model: Unknown'})`
    : deviceType;

  const formattedTime = new Date(visitTime || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1e293b; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 24px; text-align: left; }
        .header h2 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
        .content { padding: 24px; }
        .grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px; }
        .item { background: #f8fafc; border: 1px solid #f1f5f9; padding: 12px 16px; border-radius: 8px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .value { font-size: 14px; color: #0f172a; font-weight: 500; word-break: break-word; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; }
        .badge { display: inline-block; background: #3b82f6; color: white; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2>🔔 Portfolio Visitor Alert</h2>
          <p>A new visitor has accessed your portfolio</p>
        </div>
        <div class="content">
          <div class="grid">
            <div class="item">
              <div class="label">🌐 IP Address</div>
              <div class="value"><code>${ip}</code></div>
            </div>
            <div class="item">
              <div class="label">📍 Approximate Location</div>
              <div class="value">${location}</div>
            </div>
            <div class="item">
              <div class="label">📱 Device & Model</div>
              <div class="value">${deviceDisplay}</div>
            </div>
            <div class="item">
              <div class="label">💻 Operating System</div>
              <div class="value">${os}</div>
            </div>
            <div class="item">
              <div class="label">🌐 Browser</div>
              <div class="value">${browser}</div>
            </div>
            <div class="item">
              <div class="label">🖥️ Screen Resolution</div>
              <div class="value">${screenResolution}</div>
            </div>
            <div class="item">
              <div class="label">🔗 Referrer</div>
              <div class="value">${referrer}</div>
            </div>
            <div class="item">
              <div class="label">📄 Page Visited</div>
              <div class="value"><code>${pageVisited}</code></div>
            </div>
            <div class="item">
              <div class="label">⏰ Visit Timestamp</div>
              <div class="value">${formattedTime}</div>
            </div>
            <div class="item">
              <div class="label">⏱️ Initial Session Duration</div>
              <div class="value"><span class="badge">${sessionDurationText}</span></div>
            </div>
          </div>
        </div>
        <div class="footer">
          Jean Marc Aguilar Portfolio Visitor Analytics System
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send email notification using Resend API or Nodemailer with environment variables.
 */
async function sendVisitorEmailNotification(data, env) {
  const htmlContent = buildVisitorEmailHtml(data);
  const subject = `🔔 Portfolio Visitor (${data.deviceType}) from ${data.location || data.ip}`;

  // Option 1: Send via Resend API if RESEND_API_KEY is configured
  if (env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM || 'Portfolio Analytics <onboarding@resend.dev>',
          to: [env.EMAIL_TO || 'onboarding@resend.dev'],
          subject,
          html: htmlContent,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        console.log(`[Visitor Analytics] Email sent via Resend API (id: ${resData.id})`);
        return { sent: true };
      } else {
        console.error('[Visitor Analytics] Resend API Error:', resData.message || resData);
        return { sent: false, error: resData.message || 'Resend error' };
      }
    } catch (err) {
      console.error('[Visitor Analytics] Resend API Exception:', err.message);
      return { sent: false, error: err.message };
    }
  }

  // Option 2: Send via Nodemailer (Gmail / Custom SMTP)
  const user = env.EMAIL_USER;
  const pass = env.EMAIL_PASS;
  const to = env.EMAIL_TO || env.EMAIL_USER;
  const service = env.EMAIL_SERVICE;
  const host = env.EMAIL_HOST;
  const port = env.EMAIL_PORT ? Number(env.EMAIL_PORT) : undefined;

  if (!user || !pass) {
    console.log('[Visitor Analytics] Email credentials not configured in environment variables.');
    return { sent: false, reason: 'Credentials not configured' };
  }

  try {
    let transporter;
    if (service) {
      transporter = nodemailer.createTransport({
        service,
        auth: { user, pass },
      });
    } else if (host) {
      transporter = nodemailer.createTransport({
        host,
        port: port || 587,
        secure: port === 465,
        auth: { user, pass },
      });
    } else {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    }

    await transporter.sendMail({
      from: `"Portfolio Analytics" <${user}>`,
      to,
      subject,
      html: htmlContent,
      text: `Portfolio Visitor Alert\nIP: ${data.ip}\nLocation: ${data.location}\nDevice: ${data.deviceType} (${data.iphoneModel || 'N/A'})\nOS: ${data.os}\nBrowser: ${data.browser}\nScreen: ${data.screenResolution}\nPage: ${data.pageVisited}\nReferrer: ${data.referrer}`,
    });

    console.log(`[Visitor Analytics] Email alert sent successfully to ${to}`);
    return { sent: true };
  } catch (error) {
    if (error.message && error.message.includes('535')) {
      console.error(
        '[Visitor Analytics] Gmail Authentication Failed (535 Bad Credentials).\n' +
        'Please ensure you are using a 16-character Google App Password (not your standard Gmail password).\n' +
        'Generate one at: https://myaccount.google.com/apppasswords'
      );
    } else {
      console.error('[Visitor Analytics] Failed to send email alert:', error.message);
    }
    return { sent: false, error: error.message };
  }
}

/**
 * Main backend function to process visitor analytics payload.
 */
export async function processVisitorAnalytics({ req, env, payload = {} }) {
  const rawIp = getClientIp(req);
  const { ip, location } = await getApproximateLocation(req, rawIp);

  const {
    sessionId = 'session_default',
    deviceType = 'Desktop',
    iphoneModel = null,
    os = 'Unknown OS',
    browser = 'Unknown Browser',
    screenResolution = 'Unknown',
    referrer = 'Direct / None',
    pageVisited = '/',
    visitTime = new Date().toISOString(),
    sessionDuration = 0,
    isHeartbeat = false,
  } = payload;

  const durationText = formatDuration(sessionDuration);

  const visitorData = {
    ip,
    location,
    deviceType,
    iphoneModel,
    os,
    browser,
    screenResolution,
    referrer,
    pageVisited,
    visitTime,
    sessionDuration,
    sessionDurationText: durationText,
  };

  // Heartbeats don't trigger new email notifications
  if (isHeartbeat) {
    return {
      status: 200,
      body: { success: true, message: 'Session updated', visitorData },
    };
  }

  // Check rate limit per IP / Session
  const rateKey = `${ip}:${sessionId}`;
  const now = Date.now();
  const rateLimitMs = (Number(env.ANALYTICS_RATE_LIMIT_MINS) || 10) * 60 * 1000;
  const lastSent = emailRateLimits.get(rateKey);

  let emailResult = { sent: false, reason: 'Rate limited' };

  if (!lastSent || now - lastSent > rateLimitMs) {
    emailRateLimits.set(rateKey, now);
    emailResult = await sendVisitorEmailNotification(visitorData, env);

    // Prune old rate limit entries
    for (const [k, timestamp] of emailRateLimits.entries()) {
      if (now - timestamp > rateLimitMs * 2) {
        emailRateLimits.delete(k);
      }
    }
  } else {
    console.log(`[Visitor Analytics] Email notification rate limited for ${rateKey}`);
  }

  return {
    status: 200,
    body: {
      success: true,
      emailSent: emailResult.sent,
      visitorData,
    },
  };
}
