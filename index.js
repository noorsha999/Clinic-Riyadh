import express from "express";
import "dotenv/config";
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import SIP routes
import sipRoutes from "./routes/sip.js";
import { router as calRoutes } from "./routes/cal.js";


// Use SIP and Calendar routes
app.use("/sip/", sipRoutes);
app.use("/cal/", calRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
