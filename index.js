import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Create transporter for Brevo
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // Brevo SMTP login
        pass: process.env.SMTP_PASS, // Brevo SMTP password
    },
});

// Function to send email
const sendEmail = async ({ to, subject, html }) => {
    try {
        if (!to || !subject || !html) {
            throw new Error("Missing required email parameters");
        }

        const response = await transporter.sendMail({
            from: `"Authify Support" <${process.env.SMTP_USER}>`, // Sender email
            to,
            subject,
            html,
        });

        console.log(`Email sent successfully to ${to}:`, response);
        return response;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`, { error });
        throw error;
    }
};

// API endpoint for sending email
app.post("/send-email", async (req, res) => {
    const { email, subject, html, apiKey } = req.body;

    // Validate API Key
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const response = await sendEmail({ to: email, subject, html });
        res.status(200).json({ success: true, message: "Email sent successfully", response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
