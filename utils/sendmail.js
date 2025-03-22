import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transport instance
const transport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // Your email app password
  },
});

// Verify the transport configuration
transport.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error.message);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

// Sendmail function
export const Sendmail = async (to, subject, text) => {
  try {
    // Validate input parameters
    if (!to || !subject || !text) {
      throw new Error(
        "Missing required parameters: 'to', 'subject', or 'text'"
      );
    }

    // Mail options
    const mailOptions = {
      from: `"the greetings from"<${process.env.EMAIL_USER}>`, // Sender's name and email
      to, // Recipient email address
      subject, // Subject of the email
      text, // Email content in plain text
    };

    // Send email
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully. Message ID:", info.messageId);

    return { success: true, messageId: info.messageId }; // Return more detailed success response
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message }; // Return error details for better debugging
  }
};
