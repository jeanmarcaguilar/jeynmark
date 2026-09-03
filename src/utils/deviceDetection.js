/**
 * Client-side non-invasive device and environment detection utility.
 * Strictly avoids invasive fingerprinting, canvas hashing, or GPS collection.
 */

// WebGL GPU Renderer helper
function getWebGLRenderer() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return null;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return null;
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || null;
  } catch {
    return null;
  }
}

/**
 * iPhone / iPad exact model detection.
 * Returns exact model string if uniquely deterministic, or 'Unknown' if ambiguous or unidentifiable.
 */
function detectAppleDeviceModel(ua, isIPhone, isIPad) {
  if (!isIPhone && !isIPad) return null;

  const w = window.screen.width;
  const h = window.screen.height;
  const portraitW = Math.min(w, h);
  const portraitH = Math.max(w, h);
  const dpr = window.devicePixelRatio || 1;
  const gpu = getWebGLRenderer() || '';

  if (isIPhone) {
    // 430 x 932 @ 3x
    if (portraitW === 430 && portraitH === 932 && dpr === 3) {
      if (/A18 Pro/i.test(gpu)) return 'iPhone 16 Pro Max';
      if (/A17 Pro/i.test(gpu)) return 'iPhone 15 Pro Max';
      if (/A16/i.test(gpu)) return 'iPhone 14 Pro Max';
      return 'Unknown'; // Could be iPhone 15 Plus or 16 Plus (ambiguous GPU/specs)
    }

    // 402 x 874 @ 3x
    if (portraitW === 402 && portraitH === 874 && dpr === 3) {
      if (/A18/i.test(gpu)) return 'iPhone 16 Pro';
      return 'Unknown';
    }

    // 393 x 852 @ 3x
    if (portraitW === 393 && portraitH === 852 && dpr === 3) {
      if (/A17 Pro/i.test(gpu)) return 'iPhone 15 Pro';
      // Ambiguous between iPhone 14 Pro, iPhone 15, iPhone 16 standard (sharing A16/A18 variants)
      return 'Unknown';
    }

    // 428 x 926 @ 3x
    if (portraitW === 428 && portraitH === 926 && dpr === 3) {
      if (/A14/i.test(gpu)) return 'iPhone 12 Pro Max';
      // Ambiguous between iPhone 13 Pro Max / iPhone 14 Plus
      return 'Unknown';
    }

    // 390 x 844 @ 3x
    if (portraitW === 390 && portraitH === 844 && dpr === 3) {
      // iPhone 12, 12 Pro, 13, 13 Pro, 14 standard share 390x844 @ 3x.
      // High degree of spec overlap makes 100% deterministic distinction impossible without guessing.
      return 'Unknown';
    }

    // 414 x 896 @ 3x vs @ 2x
    if (portraitW === 414 && portraitH === 896) {
      if (dpr === 2) return 'iPhone 11'; // or iPhone XR - ambiguous
      return 'Unknown';
    }

    // 375 x 812 @ 3x
    if (portraitW === 375 && portraitH === 812 && dpr === 3) {
      if (/Apple GPU|Apple A11/i.test(gpu)) return 'iPhone X';
      return 'Unknown'; // iPhone XS / 11 Pro / 12 mini / 13 mini overlap
    }

    // 414 x 736 @ 3x
    if (portraitW === 414 && portraitH === 736 && dpr === 3) {
      return 'Unknown'; // 6 Plus / 6s Plus / 7 Plus / 8 Plus overlap
    }

    // 375 x 667 @ 2x
    if (portraitW === 375 && portraitH === 667 && dpr === 2) {
      return 'Unknown'; // iPhone 6/7/8/SE (2nd/3rd gen) overlap
    }

    // 320 x 568 @ 2x
    if (portraitW === 320 && portraitH === 568 && dpr === 2) {
      if (/Apple A7/i.test(gpu)) return 'iPhone 5s';
      return 'Unknown'; // SE 1st gen / 5s overlap
    }

    return 'Unknown';
  }

  if (isIPad) {
    if (portraitW === 1024 && portraitH === 1366 && dpr === 2) {
      return 'Unknown'; // iPad Pro 12.9" (multiple generations)
    }
    if (portraitW === 834 && portraitH === 1194 && dpr === 2) {
      return 'Unknown'; // iPad Pro 11" (multiple generations)
    }
    return 'Unknown';
  }

  return null;
}

export async function fetchClientPublicIp() {
  if (typeof window === 'undefined') return null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
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

export function detectDeviceDetails() {
  if (typeof window === 'undefined') return {};

  const ua = navigator.userAgent || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  // iOS / iPad OS detection
  const isIPhone = /iPhone|iPod/.test(ua);
  const isIPad = /iPad/.test(ua) || (maxTouchPoints > 0 && /Macintosh/.test(ua));

  // Device Type
  let deviceType = 'Desktop';
  if (isIPhone || /Android.*Mobile|Windows Phone|IEMobile|BlackBerry|webOS/i.test(ua)) {
    deviceType = 'Mobile';
  } else if (isIPad || /Android(?!.*Mobile)|Tablet/i.test(ua) || (maxTouchPoints > 0 && Math.min(window.screen.width, window.screen.height) < 1024)) {
    deviceType = 'Tablet';
  } else if (Math.min(window.screen.width, window.screen.height) < 768 && maxTouchPoints > 0) {
    deviceType = 'Mobile';
  }

  // iPhone / iPad Model
  const iphoneModel = (isIPhone || isIPad) ? detectAppleDeviceModel(ua, isIPhone, isIPad) : null;

  // Operating System
  let os = 'Unknown OS';
  if (isIPhone) {
    const match = ua.match(/OS (\d+[_.\d]+)/);
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
  } else if (isIPad) {
    const match = ua.match(/OS (\d+[_.\d]+)/);
    os = match ? `iPadOS ${match[1].replace(/_/g, '.')}` : 'iPadOS';
  } else if (/Android/i.test(ua)) {
    const match = ua.match(/Android (\d+[.\d]*)/);
    os = match ? `Android ${match[1]}` : 'Android';
  } else if (/Windows/i.test(ua)) {
    if (/Windows NT 10\.0/i.test(ua)) {
      os = 'Windows 10/11';
    } else if (/Windows NT 6\.3/i.test(ua)) {
      os = 'Windows 8.1';
    } else if (/Windows NT 6\.1/i.test(ua)) {
      os = 'Windows 7';
    } else {
      os = 'Windows';
    }
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    const match = ua.match(/Mac OS X (\d+[_.\d]+)/);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  } else if (/CrOS/i.test(ua)) {
    os = 'ChromeOS';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  // Browser Detection
  let browser = 'Unknown Browser';
  if (/Edg|EdgiOS|EdgA/i.test(ua)) {
    const match = ua.match(/Edg(?:e|iOS|A)?\/(\d+[.\d]*)/);
    browser = match ? `Edge ${match[1]}` : 'Edge';
  } else if (/OPR|Opera/i.test(ua)) {
    const match = ua.match(/(?:OPR|Opera)\/(\d+[.\d]*)/);
    browser = match ? `Opera ${match[1]}` : 'Opera';
  } else if (/CriOS/i.test(ua)) {
    const match = ua.match(/CriOS\/(\d+[.\d]*)/);
    browser = match ? `Chrome ${match[1]}` : 'Chrome (iOS)';
  } else if (/Chrome/i.test(ua)) {
    const match = ua.match(/Chrome\/(\d+[.\d]*)/);
    browser = match ? `Chrome ${match[1]}` : 'Chrome';
  } else if (/FxiOS/i.test(ua)) {
    const match = ua.match(/FxiOS\/(\d+[.\d]*)/);
    browser = match ? `Firefox ${match[1]}` : 'Firefox (iOS)';
  } else if (/Firefox/i.test(ua)) {
    const match = ua.match(/Firefox\/(\d+[.\d]*)/);
    browser = match ? `Firefox ${match[1]}` : 'Firefox';
  } else if (/Safari/i.test(ua) && !/Chrome|Android/i.test(ua)) {
    const match = ua.match(/Version\/(\d+[.\d]*)/);
    browser = match ? `Safari ${match[1]}` : 'Safari';
  }

  // Screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height} (@${window.devicePixelRatio || 1}x)`;

  // Referrer
  const referrer = document.referrer || 'Direct / None';

  // Page Visited
  const pageVisited = window.location.pathname + window.location.search;

  return {
    deviceType,
    iphoneModel,
    os,
    browser,
    screenResolution,
    referrer,
    pageVisited,
    visitTime: new Date().toISOString(),
  };
}
