// The value this app shows next to your lab code. ShaLabs computes the same
// value from the code it gave you, so entering it proves you ran the app.
// It is a learning check, not a secret: anyone who reads this file can
// compute it.
import { createHash } from "node:crypto";

export const VERIFICATION_LENGTH = 6;

/** The first six hex digits of SHA-256("shalabs:" + your lab code). */
export function verificationFor(labCode) {
  const code = String(labCode ?? "").trim().toUpperCase();
  return createHash("sha256").update(`shalabs:${code}`, "utf8").digest("hex").slice(0, VERIFICATION_LENGTH);
}
