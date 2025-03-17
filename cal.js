import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_ID = process.env.CAL_ID;
const CAL_API_URL = 'https://api.cal.com/v1';

// Generic API Request Function
async function calApiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Authorization': `Bearer ${CAL_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${CAL_API_URL}${endpoint}`, options);
  if (!response.ok) {
    console.error(`Cal API Error: ${response.statusText}`);
    throw new Error(`Cal API Error: ${response.statusText}`);
  }
  return await response.json();
}

// Get Available Slots Function
async function getAvailability(startDate, endDate) {
  const endpoint = `/availability/calendar/${CAL_ID}?start=${startDate}&end=${endDate}`;
  const data = await calApiRequest(endpoint);
  return data;
}

// Book Appointment Function
async function bookAppointment(slotId, patientInfo) {
  const body = {
    calendarId: CAL_ID,
    slotId: slotId,
    attendee: {
      name: patientInfo.name,
      email: patientInfo.email,
      phone: patientInfo.phone,
    },
    fields: [
      {
        id: 'notes',
        value: patientInfo.notes || '',
      }
    ]
  };

  const booking = await calApiRequest('/bookings', 'POST', body);
  return booking;
}

// API Route: Get Available Slots
router.get('/availability', async (req, res) => {
  const { start, end } = req.query;
  try {
    const slots = await getAvailability(start, end);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Route: Book Appointment
router.post('/book', async (req, res) => {
  const { slotId, patientInfo } = req.body;
  try {
    const booking = await bookAppointment(slotId, patientInfo);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚩 THIS LINE IS IMPORTANT!!
export { router };
