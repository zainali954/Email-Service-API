# **Email Service API**

A lightweight, reusable Node.js service for sending emails. This service is designed to handle email functionality, such as sending verification emails, password reset links, and other notifications, for multiple applications.

---

## **Features**
- 📧 Send dynamic emails with customizable content.
- 🔒 Secured with an API key to prevent unauthorized access.
- 🌐 Configurable SMTP support (e.g., Brevo, Gmail, or others).
- 🚀 Lightweight and fast, ideal for integration with frontend or backend applications.

---

## **Getting Started**

Follow these steps to set up and use the Email Service API.

### **1. Clone the Repository**
```bash
git clone https://github.com/zainali954/Email-Service-API.git
cd email-service-api
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the project root and add the following:
```
# Server Configuration
PORT=3000

# SMTP Credentials
SMTP_USER=your-smtp-login@example.com
SMTP_PASS=your-smtp-password

# API Key for Authorization
API_KEY=your-secure-api-key
```

> Replace the placeholder values (`your-smtp-login@example.com`, `your-smtp-password`, etc.) with your actual credentials.

---

## **Usage**

### **Run the Service**
Start the server with the following command:
```bash
npm run dev
```
The server will run on the port specified in the `.env` file (default is `3000`).

---

### **API Endpoints**

#### **1. `POST /send-email`**
Send an email with customizable details.

- **Request Body** (JSON):
  ```json
  {
      "email": "recipient@example.com",
      "subject": "Your Subject Here",
      "html": "<p>Your HTML content here</p>",
      "apiKey": "your-secure-api-key"
  }
  ```

- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
        "success": true,
        "message": "Email sent successfully",
        "response": { /* SMTP server response details */ }
    }
    ```
  - **Error** (`401 Unauthorized` or `500 Internal Server Error`):
    ```json
    {
        "success": false,
        "message": "Error details here"
    }
    ```

- **Example Request** (using `fetch` in JavaScript):
  ```javascript
  fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email: "recipient@example.com",
          subject: "Welcome to My App",
          html: "<h1>Welcome!</h1><p>Thank you for signing up.</p>",
          apiKey: "your-secure-api-key",
      }),
  })
      .then((response) => response.json())
      .then((data) => console.log("Email sent:", data))
      .catch((error) => console.error("Error sending email:", error));
  ```

---

## **Project Structure**
```
.
├── node_modules/          # Project dependencies
├── .env                   # Environment variables (not tracked in Git)
├── package.json           # NPM configuration
├── index.js              # Main server file
├── README.md              # Documentation
```

---

## **Security**
1. Keep your `.env` file private and never expose sensitive credentials.
2. Use a strong and unique `API_KEY` to prevent unauthorized access.
3. Monitor usage to ensure the service isn’t being abused.

---

## **Best Practices**
- **For Production**: Use a professional SMTP provider like **Brevo**, **SendGrid**, or **AWS SES** for higher reliability and scalability.
- **Error Handling**: Implement proper error handling in your client app to handle email failures gracefully.
- **Rate-Limiting**: Add rate-limiting middleware to prevent abuse (e.g., `express-rate-limit`).

---

## **Contributing**
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

---

## **License**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
