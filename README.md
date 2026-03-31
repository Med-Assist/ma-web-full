# MedAssist V3 Frontend Setup

Tài liệu này hướng dẫn chạy `ma-web` local và cấu hình an toàn cho các tính năng AI/OCR.

## 1. Yêu cầu

- Node.js 18+
- npm
- Git

## 2. Cài đặt

```bash
git clone <repo-url>
cd ma-web
npm install
```

## 3. Tạo biến môi trường

```bash
copy .env.example .env.local
```

Điền giá trị thực vào `.env.local` (không commit file này).

### Firebase + Data Connect

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_USE_DATACONNECT_EMULATOR=false
NEXT_PUBLIC_DATACONNECT_EMULATOR_HOST=127.0.0.1
NEXT_PUBLIC_DATACONNECT_EMULATOR_PORT=9399
```

### Gemini (server-side)

```env
GEMINI_API_KEY=...
GEMINI_CHAT_MODEL=gemini-2.5-flash
GEMINI_VISION_MODEL=gemini-2.5-flash
```

### OCR Google Document AI (server-side)

```env
OCR_GOOGLE_PROJECT_ID=...
OCR_GOOGLE_LOCATION=asia-southeast1
OCR_GOOGLE_PROCESSOR_ID=...
OCR_GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64=...
OCR_MAX_FILE_SIZE_MB=12
```

Gợi ý tạo `OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`:

- PowerShell:

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content .\ocr-key.json -Raw)))
```

## 4. Chạy dự án

```bash
npm run dev
```

Mở `http://localhost:3000`.

## 5. Build production

```bash
npm run build
```

## 6. Ghi chú bảo mật

- Không commit `.env.local`.
- Không đặt API key/private key trực tiếp trong source code.
- Tất cả key AI/OCR phải ở server env và chỉ gọi qua `/api/*`.
- Các biến `NEXT_PUBLIC_*` được phép xuất hiện trên client (đây là cấu hình public của SDK), không dùng chúng cho secret.
