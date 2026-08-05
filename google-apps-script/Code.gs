const CONFIG = {
  spreadsheetName: 'IAHSS CFC Award Nominations',
  sheetName: '2026 Nominations',
  driveFolderName: 'IAHSS CFC 2026 Award Nominations',
  emailRecipients: [
    'bbeers@tgh.org',
    'info@iahss.org',
    'info@iahss-cfc.org',
    'thomas.gooden@va.gov',
    'jeccica.schelble@baycare.org',
    'iahsscfc@gmail.com'
  ],
  chapterEmail: 'info@iahss-cfc.org'
};

function doGet() {
  return HtmlService.createHtmlOutput('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:30px"><h1>IAHSS Central Florida Award Nomination Service</h1><p>This service receives submissions from the chapter website.</p></body></html>');
}

function doPost(e) {
  try {
    const data = normalizeSubmission_(e.parameter, e.parameters);
    if (data.website) return response_('Submission rejected.');
    validateSubmission_(data);

    const resources = getOrCreateResources_();
    const submissionId = Utilities.getUuid();
    const timestamp = new Date();
    const baseName = safeFileName_(`${data.awardCategory} - ${data.nomineeName} - ${submissionId.slice(0, 8)}`);

    const docFile = createNominationDocument_(resources.folder, baseName, data, submissionId, timestamp);
    const pdfFile = resources.folder.createFile(docFile.getAs(MimeType.PDF)).setName(`${baseName}.pdf`);
    const docxBlob = UrlFetchApp.fetch(`https://docs.google.com/document/d/${docFile.getId()}/export?format=docx`, {
      headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` }
    }).getBlob().setName(`${baseName}.docx`);
    const docxFile = resources.folder.createFile(docxBlob);

    appendSubmission_(resources.sheet, timestamp, submissionId, data, pdfFile, docxFile);
    sendReviewEmail_(data, submissionId, pdfFile, docxFile);
    sendSponsorConfirmation_(data, submissionId, pdfFile);

    return response_('Nomination submitted successfully. You may close this window.');
  } catch (error) {
    console.error(error);
    return response_('The nomination could not be submitted. Please contact info@iahss-cfc.org.', true);
  }
}

function normalizeSubmission_(single, multi) {
  return {
    formVersion: single.formVersion || '',
    website: single.website || '',
    awardCategory: single.awardCategory || '',
    nomineeName: single.nomineeName || '',
    nomineeTitle: single.nomineeTitle || '',
    nomineeOrganization: single.nomineeOrganization || '',
    nomineeAddress: single.nomineeAddress || '',
    nomineeCityStateZip: single.nomineeCityStateZip || '',
    nomineePhone: single.nomineePhone || '',
    certificationStatus: single.certificationStatus || '',
    certificationLevels: (multi.certificationLevels || []).join(', '),
    certificationNumber: single.certificationNumber || '',
    sponsorName: single.sponsorName || '',
    sponsorMemberId: single.sponsorMemberId || '',
    sponsorEmail: single.sponsorEmail || '',
    sponsorPhone: single.sponsorPhone || '',
    submissionDate: single.submissionDate || '',
    attestation: single.attestation || '',
    narrative: single.narrative || '',
    supportingDocumentLink: single.supportingDocumentLink || ''
  };
}

function validateSubmission_(data) {
  const required = ['awardCategory', 'nomineeName', 'nomineeTitle', 'nomineeOrganization', 'sponsorName', 'sponsorMemberId', 'sponsorEmail', 'submissionDate', 'attestation', 'narrative'];
  required.forEach((field) => {
    if (!String(data[field] || '').trim()) throw new Error(`Missing required field: ${field}`);
  });
  const words = data.narrative.trim().split(/\s+/).filter(Boolean);
  if (words.length < 200) throw new Error('Narrative must contain at least 200 words.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sponsorEmail)) throw new Error('Invalid sponsor email address.');
}

function getOrCreateResources_() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheet;
  let folder;

  const spreadsheetId = props.getProperty('SPREADSHEET_ID');
  if (spreadsheetId) spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  else {
    spreadsheet = SpreadsheetApp.create(CONFIG.spreadsheetName);
    props.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Submission ID', 'Award Category', 'Nominee Name', 'Title', 'Organization', 'Address', 'City/State/ZIP', 'Phone', 'Certification Status', 'Certification Levels', 'Certification Number', 'Sponsor Name', 'Sponsor Member ID', 'Sponsor Email', 'Sponsor Phone', 'Submission Date', 'Narrative', 'Supporting Document', 'PDF', 'DOCX']);
    sheet.setFrozenRows(1);
  }

  const folderId = props.getProperty('FOLDER_ID');
  if (folderId) folder = DriveApp.getFolderById(folderId);
  else {
    const matches = DriveApp.getFoldersByName(CONFIG.driveFolderName);
    folder = matches.hasNext() ? matches.next() : DriveApp.createFolder(CONFIG.driveFolderName);
    props.setProperty('FOLDER_ID', folder.getId());
  }
  return { spreadsheet, sheet, folder };
}

function createNominationDocument_(folder, baseName, data, submissionId, timestamp) {
  const doc = DocumentApp.create(baseName);
  const body = doc.getBody();
  body.clear();

  body.appendParagraph('IAHSS CENTRAL FLORIDA CHAPTER').setHeading(DocumentApp.ParagraphHeading.HEADING2).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph('AWARD NOMINATION FORM').setHeading(DocumentApp.ParagraphHeading.TITLE).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Submission ID: ${submissionId}`).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Received: ${Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'MMMM d, yyyy h:mm a')}`).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendHorizontalRule();

  addSection_(body, 'Award Category', [[data.awardCategory, '']]);
  addSection_(body, 'Nominee Information', [
    ['Name', data.nomineeName], ['Title', data.nomineeTitle], ['Company / Organization', data.nomineeOrganization],
    ['Address', data.nomineeAddress], ['City / State / ZIP', data.nomineeCityStateZip], ['Phone', data.nomineePhone]
  ]);
  addSection_(body, 'IAHSS Certification', [
    ['Status', data.certificationStatus], ['Level(s)', data.certificationLevels], ['Certification Number', data.certificationNumber]
  ]);
  addSection_(body, 'Sponsoring IAHSS Member', [
    ['Name', data.sponsorName], ['Member ID', data.sponsorMemberId], ['Email', data.sponsorEmail], ['Phone', data.sponsorPhone], ['Date', data.submissionDate]
  ]);

  body.appendParagraph('Nomination Narrative').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(data.narrative);
  if (data.supportingDocumentLink) {
    body.appendParagraph('Supporting Document').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(data.supportingDocumentLink);
  }
  body.appendHorizontalRule();
  body.appendParagraph('Attestation: The sponsoring member confirmed that the statements were reviewed and believed to be accurate.').setItalic(true);

  doc.saveAndClose();
  const file = DriveApp.getFileById(doc.getId());
  file.moveTo(folder);
  return file;
}

function addSection_(body, title, rows) {
  body.appendParagraph(title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  const tableRows = rows.map((row) => row[1] === '' ? [row[0]] : [row[0], row[1] || 'Not provided']);
  const table = body.appendTable(tableRows);
  table.setBorderColor('#d9e2e8');
  if (tableRows[0].length === 2) {
    for (let i = 0; i < table.getNumRows(); i++) table.getRow(i).getCell(0).setBackgroundColor('#eef7f8').editAsText().setBold(true);
  }
}

function appendSubmission_(sheet, timestamp, id, data, pdfFile, docxFile) {
  sheet.appendRow([
    timestamp, id, data.awardCategory, data.nomineeName, data.nomineeTitle, data.nomineeOrganization,
    data.nomineeAddress, data.nomineeCityStateZip, data.nomineePhone, data.certificationStatus,
    data.certificationLevels, data.certificationNumber, data.sponsorName, data.sponsorMemberId,
    data.sponsorEmail, data.sponsorPhone, data.submissionDate, data.narrative,
    data.supportingDocumentLink, pdfFile.getUrl(), docxFile.getUrl()
  ]);
}

function sendReviewEmail_(data, id, pdfFile, docxFile) {
  const subject = `[IAHSS CFC Award Nomination] ${data.awardCategory} - ${data.nomineeName}`;
  const body = [
    'A new IAHSS Central Florida award nomination was submitted.', '',
    `Submission ID: ${id}`, `Award: ${data.awardCategory}`, `Nominee: ${data.nomineeName}`,
    `Organization: ${data.nomineeOrganization}`, `Sponsor: ${data.sponsorName}`,
    `Sponsor email: ${data.sponsorEmail}`, '',
    'The completed nomination is attached as PDF and Word documents.'
  ].join('\n');
  MailApp.sendEmail({
    to: CONFIG.emailRecipients.join(','),
    replyTo: data.sponsorEmail,
    name: 'IAHSS Central Florida Awards',
    subject,
    body,
    attachments: [pdfFile.getBlob(), docxFile.getBlob()]
  });
}

function sendSponsorConfirmation_(data, id, pdfFile) {
  MailApp.sendEmail({
    to: data.sponsorEmail,
    replyTo: CONFIG.chapterEmail,
    name: 'IAHSS Central Florida Awards',
    subject: `Award nomination received - ${data.nomineeName}`,
    body: `Thank you, ${data.sponsorName}.\n\nYour nomination for ${data.nomineeName} (${data.awardCategory}) was received.\nSubmission ID: ${id}\n\nA copy is attached for your records.\n\nIAHSS Central Florida Chapter`,
    attachments: [pdfFile.getBlob()]
  });
}

function response_(message, isError) {
  const color = isError ? '#8a1c1c' : '#0a6b55';
  return HtmlService.createHtmlOutput(`<!doctype html><html><body style="font-family:Arial,sans-serif;padding:30px;color:${color}"><h2>${escapeHtml_(message)}</h2></body></html>`);
}

function safeFileName_(name) {
  return name.replace(/[\\/:*?"<>|#%{}~&]/g, '-').replace(/\s+/g, ' ').trim();
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
