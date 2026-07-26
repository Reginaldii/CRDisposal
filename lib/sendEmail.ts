import nodemailer from 'nodemailer';

type Attachment = { filename: string; content: string; encoding: 'base64' };

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return transporter;
}

// Returns false (instead of throwing) when GMAIL_USER/GMAIL_APP_PASSWORD
// aren't set, so callers can fall back to logging in local dev/preview
// environments that don't have those env vars configured.
export async function sendNotificationEmail({
  subject,
  text,
  attachments,
}: {
  subject: string;
  text: string;
  attachments?: Attachment[];
}): Promise<boolean> {
  const transport = getTransporter();
  const to = process.env.GMAIL_USER;
  if (!transport || !to) return false;

  await transport.sendMail({
    from: `"CR Disposal Website" <${to}>`,
    to,
    subject,
    text,
    attachments,
  });
  return true;
}
