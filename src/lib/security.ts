import DOMPurify from 'isomorphic-dompurify';

/**
 * Xử lý làm sạch HTML chống XSS tấn công (OWASP A03: Injection / Cross-site Scripting)
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';
  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'span', 'blockquote'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}

/**
 * Che giấu thông tin cá nhân (PII) trong log và audit log (OWASP A02: Cryptographic Failures & PII Leak)
 */
export function maskSensitiveData(data: Record<string, any>): Record<string, any> {
  if (!data || typeof data !== 'object') return data;
  const masked: Record<string, any> = { ...data };

  const sensitiveKeys = [
    'password', 'token', 'refreshToken', 'pin', 'secret',
    'idCardNumber', 'taxCode', 'bankAccountNumber', 'creditCard'
  ];

  for (const [key, val] of Object.entries(masked)) {
    if (sensitiveKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      masked[key] = '***REDACTED***';
    } else if (key.toLowerCase().includes('phone') && typeof val === 'string') {
      masked[key] = val.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
    } else if (key.toLowerCase().includes('email') && typeof val === 'string') {
      masked[key] = val.replace(/(.{2})(.*)(@.*)/, '$1****$3');
    } else if (typeof val === 'object' && val !== null) {
      masked[key] = maskSensitiveData(val);
    }
  }

  return masked;
}
