/** Mask donor PII in public views — matches nhà tài trợ directory style. */

const PUBLIC_NAME_PHRASES = new Set([
  "hoang hoa trung",
  "quy nuoi em",
  "nuoi em",
]);

const NAME_STOPWORDS = new Set([
  "chuyen",
  "khoan",
  "nuoi",
  "em",
  "tiep",
  "ung",
  "com",
  "truong",
  "ck",
  "fb",
  "ct",
  "email",
  "sdt",
  "ladipage",
  "duan",
  "xay",
  "tien",
  "phi",
  "nop",
  "ibvcb",
  "vnck",
  "vnfi",
  "gd",
  "tt",
  "ref",
  "theo",
  "doi",
  "tai",
  "khoan",
  "ngan",
  "hang",
  "vcb",
  "at",
  "gmail",
  "hotmail",
  "yahoo",
  "outlook",
  "ladipage",
]);

const CODE_PREFIXES = /^(?:NE|FT|CK|GD|TT|IB|VN|YG|YG61)$/i;

function normalizeForCompare(value: string): string {
  return value.trim().toLowerCase();
}

/** First character visible, remainder asterisks — e.g. Trương → T******, Nguyễn → N***** */
export function maskNameWord(word: string): string {
  const match = word.match(/^(\W*)([\p{L}][\p{L}'-]*)(\W*)$/u);
  if (!match) return word;

  const [, prefix, core, suffix] = match;
  if (core.length <= 1) return word;
  return `${prefix}${core[0]}${"*".repeat(core.length - 1)}${suffix}`;
}

/** Mask a multi-word person name, preserving honorifics in parentheses. */
export function maskPersonName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return name;
  if (PUBLIC_NAME_PHRASES.has(normalizeForCompare(trimmed))) return name;

  return trimmed
    .split(/\s+/)
    .map((part) => {
      const paren = part.match(/^(\()([\p{L}][\p{L}'-]*)(\))$/u);
      if (paren) {
        const [, open, inner, close] = paren;
        return `${open}${maskNameWord(inner)}${close}`;
      }
      return maskNameWord(part);
    })
    .join(" ");
}

/** e.g. Di************@gmail.com */
export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0) return email;

  const local = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex);
  const visibleCount = Math.min(2, local.length);
  const visible = local.slice(0, visibleCount);
  const hiddenCount = Math.max(local.length - visibleCount, 4);

  return `${visible}${"*".repeat(hiddenCount)}${domain}`;
}

/** e.g. *******711 — last 3 digits visible */
export function maskPhoneDigits(digits: string): string {
  const normalized = digits.replace(/\D/g, "");
  if (normalized.length < 4) return digits;
  const last3 = normalized.slice(-3);
  return `${"*".repeat(7)}${last3}`;
}

function isNameWord(word: string): boolean {
  const core = word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  if (core.length < 2) return false;
  if (/^\d+$/.test(core)) return false;
  if (/^NE\d+$/i.test(core)) return false;
  if (/^FT\d+$/i.test(core)) return false;
  if (/^IBVCB/i.test(core)) return false;
  if (/^VN(?:CK|FI)/i.test(core)) return false;
  if (CODE_PREFIXES.test(core)) return false;
  if (NAME_STOPWORDS.has(core.toLowerCase())) return false;
  if (!/^[\p{L}][\p{L}'-]*$/u.test(core)) return false;
  return true;
}

function maskNameRun(text: string): string {
  const words = text.split(/\s+/);
  const maskedWords = words.map((word) => (isNameWord(word) ? maskNameWord(word) : word));

  let consecutive = 0;
  let maxConsecutive = 0;
  for (const word of words) {
    if (isNameWord(word)) {
      consecutive += 1;
      maxConsecutive = Math.max(maxConsecutive, consecutive);
    } else {
      consecutive = 0;
    }
  }

  if (maxConsecutive < 2 && !words.some((word) => isNameWord(word) && word.length >= 4)) {
    return text;
  }

  const phrase = normalizeForCompare(words.join(" "));
  if (PUBLIC_NAME_PHRASES.has(phrase)) return text;

  return maskedWords.join(" ");
}

function maskEmailsInText(text: string): string {
  let result = text.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    (email) => maskEmail(email),
  );

  result = result.replace(
    /\b([a-zA-Z0-9._%-]+)\s+at\s+(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)\b/gi,
    (_, local, domain) => {
      const masked = maskEmail(`${local}@${domain}`);
      return masked.replace("@", " at ");
    },
  );

  result = result.replace(/\b([a-zA-Z0-9._%-]+)\.(gmail\.com|hotmail\.com)\b/gi, (_, local, domain) => {
    const visibleCount = Math.min(2, local.length);
    const visible = local.slice(0, visibleCount);
    const hiddenCount = Math.max(local.length - visibleCount, 4);
    return `${visible}${"*".repeat(hiddenCount)}.${domain}`;
  });

  return result;
}

function maskPhonesInText(text: string): string {
  let result = text.replace(
    /(?:S(?:dt|DT)|ĐT|điện thoại|phone)\s*[:\s]*(\+?84[\d\s.-]{8,12}|0[\d\s.-]{8,12})/gi,
    (match, phonePart) => {
      const digits = phonePart.replace(/\D/g, "");
      const masked = maskPhoneDigits(digits);
      return match.replace(phonePart, masked);
    },
  );

  result = result.replace(/(?<![@\w.])(\+?84|0)(\d{8,10})(?![\d.@])/g, (_, prefix, rest) => {
    const digits = `${prefix}${rest}`.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11) return `${prefix}${rest}`;
    return maskPhoneDigits(digits);
  });

  return result;
}

function maskNamesInText(text: string): string {
  return text.replace(/[\p{L}][\p{L}'-]*(?:\s+[\p{L}][\p{L}'-]*)*/gu, (match) => maskNameRun(match));
}

/** Mask emails, phone numbers, and person names inside bank transfer detail text. */
export function maskTransactionDetail(text: string): string {
  if (!text.trim()) return text;

  let result = maskEmailsInText(text);
  result = maskPhonesInText(result);
  result = maskNamesInText(result);
  return result;
}
