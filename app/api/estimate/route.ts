import { NextRequest, NextResponse } from 'next/server';

// Vercel's default body size limit for API routes is 4.5MB. Compressed
// photos (see lib/compressImage.ts) keep a typical submission well under
// that, but this is the ceiling to watch if photo count/quality changes.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, address, zip } = body ?? {};

    if (!name || !phone || !address || !zip) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { photos, ...summary } = body;

    // TODO: wire up to CRM / email / SMS provider, and move photos to
    // persistent storage (e.g. Vercel Blob) instead of logging base64 data.
    console.log('New estimate request:', summary, `(${photos?.length ?? 0} photos)`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
