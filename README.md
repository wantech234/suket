# 🌿 SUKET BERSIH - Panduan Deploy

## File yang Dihasilkan
- `index.html` → Website lengkap (1 file, siap hosting)
- `google-apps-script.gs` → Script untuk Google Sheets integration
- `README.md` → Panduan ini

---

## STEP 1 – Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misal: `suketbersih`)
2. Upload file `index.html` ke repository
3. Pergi ke Settings → Pages
4. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
5. Klik Save
6. Website live di: `https://[username].github.io/suketbersih/`

---

## STEP 2 – Setup Google Sheets Integration

### A. Buat Google Sheet
1. Buka [sheets.google.com](https://sheets.google.com)
2. Buat spreadsheet baru, beri nama: **"Suket Bersih - Booking"**

### B. Pasang Google Apps Script
1. Di spreadsheet, buka menu **Extensions → Apps Script**
2. Hapus semua kode yang ada
3. Copy-paste semua isi file `google-apps-script.gs`
4. Klik **Save** (Ctrl+S)

### C. Deploy sebagai Web App
1. Klik **Deploy → New deployment**
2. Klik ikon gear ⚙️ → pilih **Web App**
3. Isi konfigurasi:
   - Description: `Suket Bersih API v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**
5. **SALIN URL** yang muncul (format: `https://script.google.com/macros/s/XXXX/exec`)

### D. Sambungkan ke Website
1. Buka file `index.html` dengan text editor
2. Cari baris:
   ```
   const GOOGLE_SCRIPT_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA';
   ```
3. Ganti dengan URL yang disalin:
   ```
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
4. Upload ulang `index.html` ke GitHub

---

## STEP 3 – Test Sistem

### Test Google Sheets
Buka URL Apps Script di browser:
```
https://script.google.com/macros/s/XXXX/exec
```
Harus muncul response JSON:
```json
{"status": "ok", "message": "Suket Bersih API aktif"}
```

### Test Form Booking
1. Buka website Anda
2. Isi form booking dengan data test
3. Submit → cek Google Sheets apakah data masuk
4. Cek WhatsApp redirect berfungsi

---

## STEP 4 – Kustomisasi

### Ganti Nomor WhatsApp
Cari di `index.html`:
```
const WA_NUMBER = '6282214381966';
```
Ganti dengan nomor Anda (format: 62 + nomor tanpa 0 awal)

### Ganti Informasi Bisnis
- **Nama bisnis**: Cari `Suket Bersih` (beberapa tempat)
- **Tagline**: Cari `Reresik Suket`
- **Area layanan**: Cari section `.area-tags`
- **Harga**: Cari `service-price` di setiap service card
- **Testimoni**: Cari section `testi-section`

---

## Fitur WhatsApp Funnel

### Cara Kerja (100% Frontend, No Server)

| Step | Waktu | Pesan |
|------|-------|-------|
| Step 1 | Langsung saat submit | Auto-redirect ke WA dengan data booking |
| Step 2 | 15 menit kemudian | Notifikasi popup di website (jika masih buka) |
| Step 3 | 24 jam kemudian | Notifikasi popup di website (jika buka ulang) |

Data disimpan di `localStorage` browser user.

**Catatan**: Step 2 & 3 hanya muncul jika user masih/kembali membuka website Anda. Untuk follow-up yang lebih powerful, lihat bagian CRM di bawah.

---

## Google Sheets sebagai CRM Sederhana

Sheet `Bookings` memiliki kolom:
- Timestamp
- Nama
- No. WhatsApp
- Alamat
- Layanan
- Luas Area (m²)
- Tanggal Pengerjaan
- Catatan
- **Status** (Baru / Diproses / Selesai / Batal)

### Cara Pakai
1. Update kolom Status secara manual
2. Tambahkan filter untuk lihat booking per status
3. Export ke CSV untuk broadcast WhatsApp massal

---

## SEO Checklist

- [x] Meta title & description
- [x] Open Graph tags
- [x] Twitter Card
- [x] LocalBusiness Schema JSON-LD
- [x] Keyword: jasa potong rumput Sleman
- [x] Keyword: bersih semak Jogja
- [x] Keyword: jasa bersih lahan Yogyakarta
- [ ] Daftarkan ke Google Search Console
- [ ] Daftarkan ke Google Business Profile

---

## Support & Contact

Untuk pertanyaan teknis, hubungi via WhatsApp:
[wa.me/6282214381966](https://wa.me/6282214381966)
"# suket" 
