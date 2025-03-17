# Clinic-Riyadh SIP System

This project is a Node.js-based SIP call agent designed for managing SIP calls, ideal for community centers or reception systems.

##  Features

- Make SIP calls via HTTP request
- Configurable SIP credentials via `.env` file
- Simple API endpoint for triggering calls

##  Folder Structure

├── index.js               # Main server file
├── routes
│   ├── sip.js             # SIP call routes
│   └── cal.js             # Calendar or other routes (optional)
├── .env                   # Environment variables for SIP configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```


⚙️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/Clinic-Riyadh.git
cd Clinic-Riyadh
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add:

```
# SIP Credentials
SIP_SERVER=your_sip_server_address
SIP_USERNAME=your_username
SIP_PASSWORD=your_password
SIP_PROXY=optional_proxy_if_needed

# Server Port
PORT=3000
```

---

##  Running the Server

```bash
npm start
```

The server will run on `http://localhost:3000` (or the port you set in `.env`).

---

##  Making a SIP Call

### API Endpoint:

```
POST /sip/call
```

### Request Body:

```json
{
  "phoneNumber": "12345678"
}
```

The server will initiate a SIP call to the provided number.

---

## 🌐 Optional: Use with Ngrok

If you want to expose your local server to the internet:

```bash
ngrok http 3000
```

This will give you a public URL like `https://xxxxx.ngrok.io` to test from external devices.

---

## 📄 Dependencies

- **Express**: Web framework
- **dotenv**: Environment variables support
- **sip.js**: SIP call management

---

## 📃 License

This project is licensed under the MIT License.

---

## 🙌 Contribution

Feel free to fork, improve, and contribute to the project!

