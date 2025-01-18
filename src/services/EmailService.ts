import { renderTemplate } from "../config/mustache";
import { sendEmail } from "../config/sendgrid";

export class EmailService {
  async sendEmail(
    to: string,
    subject: string,
    altText: string,
    emailTemplate: string,
    replacements: Record<string, string>
  ): Promise<void> {
    try {
      // Render the template with the actual data
      const emailBody = renderTemplate(emailTemplate, replacements);

      // Send the email using SendGrid
      await sendEmail(to, subject, altText, emailBody);
    } catch (error) {
      console.error("Error in EmailService:", error);
      throw new Error("Failed to send email");
    }
  }
}
