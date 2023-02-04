#!/usr/bin/env node

import crypto from "crypto";

const { privateKey, publicKey } = await crypto.subtle.generateKey(
  { name: "ECDSA", namedCurve: "P-521" },
  true,
  ["sign", "verify"]
);

console.log(
  "PNGIN_JWT_PRIVATE_KEY=" +
    Buffer.from(
      JSON.stringify(await crypto.subtle.exportKey("jwk", privateKey))
    ).toString("base64url")
);
console.log(
  "PNGIN_JWT_PUBLIC_KEY=" +
    Buffer.from(
      JSON.stringify(await crypto.subtle.exportKey("jwk", publicKey))
    ).toString("base64url")
);
