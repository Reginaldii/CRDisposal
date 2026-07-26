import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const text = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || '—'}`, '', message].join('\n');

    const sent = await sendNotificationEmail({
      subject: `New contact message from ${name}`,
      text,
    });

    if (!sent) {
      console.log('New contact message (email not configured):', body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
