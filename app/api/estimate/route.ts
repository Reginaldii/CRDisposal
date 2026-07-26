import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';
import { appendToSheet } from '@/lib/sendToSheet';
import { findItem } from '@/lib/items';
import { estimateJob } from '@/lib/pricingEngine';

type Photo = { dataUrl: string; name: string };

// Vercel's default body size limit for API routes is 4.5MB. Compressed
// photos (see lib/compressImage.ts) keep a typical submission well under
// that, but this is the ceiling to watch if photo count/quality changes.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, address, zip, city, contactPreference, propertyType,
      itemQuantities = {}, otherDescription, locations = [], conditions = [], dateOption, chosenDate,
      notes, photos = [], referralCode, skipItemList = false, unknownItemsNote = '' } = body ?? {};

    if (!name || !phone || !address || !zip) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const preferredDate = dateOption === 'choose' ? chosenDate : dateOption || '';

    const itemSummary = Object.entries(itemQuantities as Record<string, number>)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const label = id === 'other' && otherDescription ? otherDescription : findItem(id)?.label ?? id;
        return `${label} x${qty}`;
      })
      .join(', ');

    const estimate = estimateJob({ itemQuantities, accessConditions: conditions });

    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '—'}`,
      `Preferred contact: ${contactPreference || '—'}`,
      `Address: ${address}, ${city || ''} ${zip}`,
      `Property type: ${propertyType || '—'}`,
      skipItemList
        ? `Items: Customer skipped item list — ${unknownItemsNote || 'no description provided'}`
        : `Items: ${itemSummary || '—'}`,
      otherDescription ? `Other item details: ${otherDescription}` : null,
      `Item locations: ${(locations as string[]).join(', ') || '—'}`,
      `Access conditions: ${(conditions as string[]).join(', ') || 'None'}`,
      `Preferred date: ${preferredDate || '—'}`,
      `Notes: ${notes || '—'}`,
      `Photos attached: ${photos.length}`,
      referralCode ? `Referral code: ${referralCode}` : null,
      '',
      '--- Internal estimate (not shown to customer) ---',
      `Truck fill: ${estimate.truckFillLabel} (${estimate.effectiveCuYd} effective cu yd, ${estimate.weightLbs} lbs)`,
      `Estimated labor: ${estimate.laborHours} hrs ($${estimate.laborCost})`,
      `Estimated disposal fee: $${estimate.disposalFee}`,
      `Estimated fuel fee: $${estimate.fuelFee}`,
      `Suggested price range: $${estimate.priceLow} - $${estimate.priceHigh}${skipItemList ? ' (UNRELIABLE — customer skipped item list, price from photos instead)' : ''}`,
      `Estimated profit at midpoint: $${estimate.estimatedProfit}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const attachments = (photos as Photo[]).map((p, i) => ({
      filename: p.name || `photo-${i + 1}.jpg`,
      content: p.dataUrl.split(',')[1] ?? '',
      encoding: 'base64' as const,
    }));

    const subjectEstimate = skipItemList
      ? 'photo review requested'
      : `est. $${estimate.priceLow}-$${estimate.priceHigh}`;

    const [emailSent] = await Promise.all([
      sendNotificationEmail({
        subject: `New estimate request from ${name} — ${subjectEstimate}`,
        text: lines,
        attachments,
      }),
      appendToSheet({
        type: 'Estimate',
        name,
        phone,
        email: email || '',
        address,
        city: city || '',
        zip,
        propertyType: propertyType || '',
        items: skipItemList ? 'Skipped — see photos/description' : itemSummary,
        otherDescription: otherDescription || '',
        skipItemList,
        unknownItemsNote: unknownItemsNote || '',
        locations: (locations as string[]).join(', '),
        conditions: (conditions as string[]).join(', '),
        preferredDate,
        notes: notes || '',
        photoCount: photos.length,
        referralCode: referralCode || '',
        truckFillLabel: estimate.truckFillLabel,
        effectiveCuYd: estimate.effectiveCuYd,
        weightLbs: estimate.weightLbs,
        laborHours: estimate.laborHours,
        disposalFee: estimate.disposalFee,
        fuelFee: estimate.fuelFee,
        priceLow: estimate.priceLow,
        priceHigh: estimate.priceHigh,
        estimatedProfit: estimate.estimatedProfit,
      }),
    ]);

    if (!emailSent) {
      // GMAIL_USER / GMAIL_APP_PASSWORD not configured for this environment.
      console.log('New estimate request (email not configured):', lines);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Estimate submission error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
