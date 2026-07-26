import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';

type Photo = { dataUrl: string; name: string };

// Vercel's default body size limit for API routes is 4.5MB. Compressed
// photos (see lib/compressImage.ts) keep a typical submission well under
// that, but this is the ceiling to watch if photo count/quality changes.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, address, zip, city, contactPreference, propertyType,
      items = [], otherDescription, conditions = [], truckFill, dateOption, chosenDate,
      notes, photos = [], referralCode } = body ?? {};

    if (!name || !phone || !address || !zip) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '—'}`,
      `Preferred contact: ${contactPreference || '—'}`,
      `Address: ${address}, ${city || ''} ${zip}`,
      `Property type: ${propertyType || '—'}`,
      `Items: ${items.join(', ') || '—'}`,
      otherDescription ? `Other item details: ${otherDescription}` : null,
      `Truck space: ${truckFill || '—'}`,
      `Special conditions: ${conditions.join(', ') || 'None'}`,
      `Preferred date: ${dateOption === 'choose' ? chosenDate : dateOption || '—'}`,
      `Notes: ${notes || '—'}`,
      `Photos attached: ${photos.length}`,
      referralCode ? `Referral code: ${referralCode}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const attachments = (photos as Photo[]).map((p, i) => ({
      filename: p.name || `photo-${i + 1}.jpg`,
      content: p.dataUrl.split(',')[1] ?? '',
      encoding: 'base64' as const,
    }));

    const sent = await sendNotificationEmail({
      subject: `New estimate request from ${name}`,
      text: lines,
      attachments,
    });

    if (!sent) {
      // GMAIL_USER / GMAIL_APP_PASSWORD not configured for this environment.
      console.log('New estimate request (email not configured):', lines);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Estimate submission error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
