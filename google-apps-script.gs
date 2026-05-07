// ============================================================
// SUKET BERSIH - Google Apps Script Web App
// Simpan data booking dari website ke Google Sheets
// ============================================================
// CARA SETUP:
// 1. Buka Google Sheets baru → beri nama "Suket Bersih - Booking"
// 2. Buka menu Extensions → Apps Script
// 3. Hapus semua kode default, paste seluruh kode ini
// 4. Klik "Deploy" → "New deployment"
// 5. Pilih tipe: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Klik Deploy → Salin URL yang muncul
// 7. Paste URL ke file index.html pada variabel GOOGLE_SCRIPT_URL
// ============================================================

const SHEET_NAME = 'Bookings';
const SPREADSHEET_ID = ''; // Kosongkan jika pakai spreadsheet aktif (yang sama dengan script)

function doPost(e) {
  try {
    // Parse incoming JSON
    const data = JSON.parse(e.postData.contents);

    // Get or create sheet
    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header if not exists
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        'Timestamp', 'Nama', 'No. WhatsApp', 'Alamat',
        'Layanan', 'Luas Area (m²)', 'Tanggal Pengerjaan',
        'Catatan', 'Status'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e5c22');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Append new row
    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.address || '',
      data.service || '',
      data.area || '',
      data.schedule || '',
      data.notes || '',
      'Baru' // Default status
    ];

    sheet.appendRow(row);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 9);

    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Booking berhasil disimpan',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET (for testing the endpoint is live)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Suket Bersih API aktif',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── OPTIONAL: Send email notification on new booking ──
// Uncomment jika ingin terima email notifikasi setiap booking masuk

/*
function sendEmailNotification(data) {
  const email = Session.getActiveUser().getEmail(); // Email akun Google Anda
  const subject = `[Suket Bersih] Booking Baru - ${data.name}`;
  const body = `
Ada booking baru masuk!

Nama      : ${data.name}
No. WA    : ${data.phone}
Alamat    : ${data.address}
Layanan   : ${data.service}
Luas Area : ${data.area} m²
Tanggal   : ${data.schedule}
Catatan   : ${data.notes || '-'}
Waktu     : ${data.timestamp}

Segera hubungi pelanggan via WhatsApp:
https://wa.me/${data.phone.replace(/^0/, '62').replace(/[^0-9]/g, '')}
  `;
  MailApp.sendEmail(email, subject, body);
}
*/
