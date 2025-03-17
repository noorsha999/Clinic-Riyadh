// Import required modules
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const SIP = require('sip.js');
const { SimpleUser } = SIP;

import express from "express";
import "dotenv/config";

const router = express.Router();

// Load SIP credentials from environment variables
const SIP_SERVER = process.env.SIP_SERVER;
const SIP_USERNAME = process.env.SIP_USERNAME;
const SIP_PASSWORD = process.env.SIP_PASSWORD;
const SIP_PROXY = process.env.SIP_PROXY || null; // Optional

if (!SIP_SERVER || !SIP_USERNAME || !SIP_PASSWORD) {
  throw new Error("Missing SIP configuration in .env");
}

// Function to make a SIP call
async function makeSIPCall(destination) {
  try {
    const user = new SimpleUser(`wss://${SIP_SERVER}`, {
      aor: `sip:${SIP_USERNAME}@${SIP_SERVER}`,
      userAgentOptions: { displayName: "AI Voice Agent" },
      media: { constraints: { audio: true, video: false } },
      transportOptions: { server: `wss://${SIP_SERVER}`, traceSip: true },
      authorizationUsername: SIP_USERNAME,
      authorizationPassword: SIP_PASSWORD,
      proxy: SIP_PROXY ? `sip:${SIP_PROXY}` : undefined,
    });

    await user.connect();
    await user.register();
    console.log("SIP Registered successfully");

    await user.call(destination);
    console.log(`Calling ${destination} via SIP...`);

  } catch (error) {
    console.error("SIP Call Error:", error);
    throw error; // Important: Re-throw to catch in API route
  }
}

// API Route to initiate a call
router.post("/call", async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    await makeSIPCall(`sip:${phoneNumber}@${SIP_SERVER}`);
    res.json({ message: "Call initiated", number: phoneNumber });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate call", details: error.message });
  }
});

export default router;
