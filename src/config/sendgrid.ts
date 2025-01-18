import sgMail from "@sendgrid/mail";
import { config } from "./index";

sgMail.setApiKey(config.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid.
 * @param to - Recipient's email address.
 * @param subject - Subject of the email.
 * @param text - Plain text content of the email.
 * @param html - HTML content of the email.
 */

export const sendEmail = (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  return sgMail
    .send({
      to,
      from: {
        name: "constGaurav",
        email: config.SENDER_EMAIL,
      },
      subject,
      text,
      html,
    })
    .then(() => {
      console.log(`Email sent to ${to}`);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    });
};
