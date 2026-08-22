import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';
import { appendToSheet } from '@/lib/sendToSheet';

type Photo = { dataUrl: string; name: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, zip, jobType, preferredDate, alternateDate, description, photos = [] } = body ?? {};
    if (!name || !phone || !zip || !jobType || !preferredDate || !description) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const safePhotos = (photos as Photo[]).slice(0, 4);
    const text = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '—'}`,
      `ZIP: ${zip}`,
      `Job type: ${jobType}`,
      `Preferred date: ${preferredDate}`,
      `Alternate date: ${alternateDate || '—'}`,
      `Photos: ${safePhotos.length}`,
      '',
      'Job description:',
      description,
    ].join('\n');
    const attachments = safePhotos.map((photo, index) => ({
      filename: photo.name || `job-photo-${index + 1}.jpg`,
      content: photo.dataUrl.split(',')[1] ?? '',
      encoding: 'base64' as const,
    }));
    const [sent] = await Promise.all([
      sendNotificationEmail({ subject: `New ${jobType} estimate request from ${name}`, text, attachments }),
      appendToSheet({ type: 'Estimate', name, phone, email: email || '', zip, items: jobType, preferredDate: alternateDate ? `${preferredDate} (alternate: ${alternateDate})` : preferredDate, notes: description, photoCount: safePhotos.length }),
    ]);
    if (!sent) console.log('New estimate request (email not configured):', text);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
