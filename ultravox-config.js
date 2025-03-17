import 'dotenv/config';

const toolsBaseUrl = process.env.TOOLS_BASE_URL; // set the ngrok URL in the .env file

const SYSTEM_PROMPT = `

**Your name is Badr. You are a saudi receptionist at Dentex Clinic, a specialized dental clinic in Saudi Arabia. you speak arabic langauge saudi delict just**  

### **Your Responsibilities:**  
1. **Always start by greeting the caller warmly and asking for their name.** 
 قول اهلا وسهلا بكم في عيادة دنتكس للاسنان ممكن اعرف ايش اسمك 
2. **Ask if they are calling to book an appointment or to inquire about the clinic's services.**  
3. **If they want to book an appointment:**  
   - Ask for their preferred date and time.  
   - Confirm their contact number.  
   - Use the "infoLookup" tool to check availability. tell them you will check the availabilty without saying  the tool name  
   - If available, confirm the booking. If not, suggest alternative slots. 
   - don't mention doctor name just confirm the booking 
4. **If they want information about services, provide answers using the FAQ below.**  
5. **For insurance, promotions, or unavailable inquiries, use the "infoLookup" tool. Do NOT make up answers!**  
6. **If a caller is upset or has an issue requiring management, transfer the call using the "transferCall" tool.**  



### **Clinic Location & Working Hours**  
The clinic is located at **Riyadh, Qurtoba Area, Thomama Road**.  
Working hours: **Saturday to Thursday from 9 AM to 10 PM. Closed on Fridays.**  

### **Available Services**  
Dentex Clinic offers:  
- Teeth cleaning and whitening  
- Cavity treatment and fillings  
- Braces (metal and clear)  
- Dental implants and zirconia crowns  
- Hollywood smile and cosmetic dentistry  

### **Booking an Appointment**  
Ask for the caller's **name, preferred date and time**, and confirm their **phone number** before checking availability. Call handleBookingIntent when user asks to book an appointment.( without telling the patient the name of the tool , just say let me check the availablity) 

### **Insurance & Promotions**  
The clinic works with various insurance companies. Contact for details.  
Special offers may be available—use "infoLookup" to check.  

 
`;

const selectedTools = [
  {
    "temporaryTool": {
      "modelToolName": "transferCall",
      "description": "Transfers call to a human. Use this if a caller is upset or if there are questions you cannot answer.",
      "automaticParameters": [
        {
          "name": "callId",
          "location": "PARAMETER_LOCATION_BODY",
          "knownValue": "KNOWN_PARAM_CALL_ID"
        }
      ],
      "dynamicParameters": [
        {
          "name": "firstName",
          "location": "PARAMETER_LOCATION_BODY",
          "schema": {
            "description": "The caller's first name",
            "type": "string",
          },
          "required": true,
        },
        {
            "name": "lastName",
            "location": "PARAMETER_LOCATION_BODY",
            "schema": {
              "description": "The caller's last name",
              "type": "string",
            },
            "required": true,
        },
        {
            "name": "transferReason",
            "location": "PARAMETER_LOCATION_BODY",
            "schema": {
              "description": "The reason the call is being transferred.",
              "type": "string",
            },
            "required": true,
        },
      ],
      "http": {
          "baseUrlPattern": `${toolsBaseUrl}/sip/transferCall`,
          "httpMethod": "POST",
        },
    },
  },
  {
    "temporaryTool": {
      "modelToolName": "infoLookup",
      "description": "Used to lookup information about the community center's soccer and swimming programs. This will search a vector database and return back chunks that are semantically similar to the query.",
      "staticParameters": [
        {
          "name": "corpusId",
          "location": "PARAMETER_LOCATION_BODY",
          "value": "679f9a85-36a0-42a6-9519-435431749fc3"
        },
        {
          "name": "maxChunks",
          "location": "PARAMETER_LOCATION_BODY",
          "value": 5
        }
      ],
      "dynamicParameters": [
        {
          "name": "query",
          "location": "PARAMETER_LOCATION_BODY",
          "schema": {
            "description": "The query to lookup.",
            "type": "string"
          },
          "required": true
        }
      ],
      "http": {
        "baseUrlPattern": "https://corpus-proxy.vercel.app/api/alpha/corpus/query",
        "httpMethod": "POST"
      }
    }
  }
];

export const ULTRAVOX_CALL_CONFIG = {
    systemPrompt: SYSTEM_PROMPT,
    model: 'fixie-ai/ultravox',
    voice: 'Badr',
    temperature: 0.3,
    firstSpeaker: 'FIRST_SPEAKER_AGENT',
    selectedTools: selectedTools,
    medium: { "sip": {} }
};
