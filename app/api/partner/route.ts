import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';
import { appendToSheet } from '@/lib/sendToSheet';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, contactName, phone, email, website, businessType, serviceArea, referralSource, notes, agreed } = body ?? {};

    if (!businessName || !contactName || !phone || !email || !serviceArea || !agreed) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const text = [
      `Business Name: ${businessName}`,
      `Contact Name: ${contactName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Website: ${website || '—'}`,
      `Business Type: ${businessType || '—'}`,
      `Service Area: ${serviceArea}`,
      `How they heard about us: ${referralSource || '—'}`,
      `Notes: ${notes || '—'}`,
    ].join('\n');

    const [sent] = await Promise.all([
      sendNotificationEmail({
        subject: `New Partner Program application from ${businessName}`,
        text,
      }),
      appendToSheet({
        type: 'Partner',
        businessName,
        contactName,
        phone,
        email,
        website: website || '',
        businessType: businessType || '',
        serviceArea,
        referralSource: referralSource || '',
        notes: notes || '',
      }),
    ]);

    if (!sent) {
      console.log('New partner application (email not configured):', body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
