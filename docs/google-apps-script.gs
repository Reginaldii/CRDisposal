// Paste this into Extensions > Apps Script on the Google Sheet you want
// submissions logged to, then deploy it as a Web App (see README.md,
// "Logging submissions to a spreadsheet" section, for the full steps).
//
// This script only runs inside Google's environment, on the copy of the
// sheet it's attached to — it is not run by this repo or by Vercel. It's
// kept here purely as a version-controlled reference copy.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.type || '',
    data.name || '',
    data.phone || '',
    data.email || '',
    data.address || '',
    data.city || '',
    data.zip || '',
    data.propertyType || '',
    data.items || '',
    data.otherDescription || '',
    data.truckFill || '',
    data.conditions || '',
    data.preferredDate || '',
    data.notes || '',
    data.photoCount || '',
    data.referralCode || '',
    data.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
