// Paste this into Extensions > Apps Script on the Google Sheet you want
// submissions logged to, then deploy it as a Web App (see README.md,
// "Logging submissions to a spreadsheet" section, for the full steps).
//
// This script only runs inside Google's environment, on the copy of the
// sheet it's attached to — it is not run by this repo or by Vercel. It's
// kept here purely as a version-controlled reference copy.
//
// Routes to one of two tabs based on submission type:
//   - "Partner" (partner applications)     -> the "Partners" tab
//   - anything else (estimate/contact)     -> the "Submissions" tab
// Both tabs must already exist (with header rows) in the spreadsheet —
// see the README for the exact column headers for each.

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);

  if (data.type === 'Partner') {
    var partnersSheet = ss.getSheetByName('Partners') || ss.getActiveSheet();
    partnersSheet.appendRow([
      new Date(),
      data.businessName || '',
      data.contactName || '',
      data.phone || '',
      data.email || '',
      data.website || '',
      data.businessType || '',
      data.serviceArea || '',
      data.referralSource || '',
      data.notes || '',
    ]);
  } else {
    var submissionsSheet = ss.getSheetByName('Submissions') || ss.getActiveSheet();
    submissionsSheet.appendRow([
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
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
