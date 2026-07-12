import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, zip } = body ?? {};

    if (!name || !phone || !zip) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // TODO: wire up to CRM / email / SMS provider.
    console.log('New quote request:', body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
