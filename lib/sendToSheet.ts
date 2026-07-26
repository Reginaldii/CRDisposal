// Appends a row to a Google Sheet via a Google Apps Script Web App
// (see docs/google-apps-script.gs for the script that URL runs). Returns
// false — instead of throwing — when GOOGLE_SHEET_WEBHOOK_URL isn't set,
// so callers can treat this the same optional way as email notifications.
export async function appendToSheet(row: Record<string, unknown>): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return false;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    return true;
  } catch (err) {
    console.error('Failed to append to Google Sheet:', err);
    return false;
  }
}
