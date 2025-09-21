const FALLBACK_PREFIX = "fallback-";

const encoder = new TextEncoder();

/**
 * Converts an array buffer digest into a hexadecimal string.
 */
const bufferToHex = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Generates a deterministic fallback hash when WebCrypto is unavailable.
 */
const fallbackHash = (value: string): string => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return `${FALLBACK_PREFIX}${(hash >>> 0).toString(16).padStart(8, "0")}`;
};

/**
 * Produces a SHA-256 hash for the provided password string with a fallback.
 */
export async function hashPassword(value: string): Promise<string> {
  if (!value) return "";

  try {
    const subtle = globalThis.crypto?.subtle;
    if (subtle && typeof subtle.digest === "function") {
      const encoded = encoder.encode(value);
      const digest = await subtle.digest("SHA-256", encoded);
      return bufferToHex(digest);
    }
  } catch (err) {
    console.warn("hashPassword: subtle digest failed", err);
  }

  return fallbackHash(value);
}
