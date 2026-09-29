import { test } from "node:test";
import assert from "node:assert/strict";
import { verificationFor } from "./verification.js";

test("the value ShaLabs expects for a known code", () => {
  // ShaLabs pins the same pair in its own tests (LabCodes.VerificationFor).
  assert.equal(verificationFor("ABC234"), "36d74c");
});

test("spacing and case in .env do not change it", () => {
  assert.equal(verificationFor("  abc234 \n"), verificationFor("ABC234"));
});
