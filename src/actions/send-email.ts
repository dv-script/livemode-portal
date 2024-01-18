"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string[];
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      react: react,
    });

    if (error) {
      return console.log(error);
    }

    return console.log(data);
  } catch (error) {
    return console.log(error);
  }
}
