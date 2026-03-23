# MedAssist V3 Frontend Setup

Tài liệu này hướng dẫn cách chạy `ma-web` ở môi trường local và cấu hình các tính năng AI dùng Gemini.

## 1. Yêu cầu

- Node.js 18 trở lên
- Git
- VS Code hoặc editor tương đương

## 2. Cài dự án

```bash
git clone https://github.com/ten-github-cua-ban/MedAssist-v3.git
cd MedAssist-v3/ma-web
npm install
```

## 3. Tạo file môi trường

Tạo file `.env.local` trong thư mục `ma-web`:

```bash
copy .env.example .env.local
```

Sau đó điền các biến Firebase/Data Connect cần thiết:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=medassist-v3
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Nếu muốn chạy với Data Connect emulator local:

```env
NEXT_PUBLIC_USE_DATACONNECT_EMULATOR=true
NEXT_PUBLIC_DATACONNECT_EMULATOR_HOST=127.0.0.1
NEXT_PUBLIC_DATACONNECT_EMULATOR_PORT=9399
```

## 4. Cấu hình Gemini

Các tính năng sau hiện dùng Gemini qua API key phía server:

- Chat AI trên dashboard
- Phân tích ảnh đáy mắt ở màn `Chẩn đoán AI võng mạc`

Thêm các biến sau vào `.env.local`:

```env
GEMINI_API_KEY=AIza...
GEMINI_CHAT_MODEL=gemini-2.5-flash
GEMINI_VISION_MODEL=gemini-2.5-flash
```

Ghi chú:

- `GEMINI_API_KEY` là bắt buộc nếu muốn dùng AI.
- Hai biến model là tùy chọn, có thể giữ mặc định.
- API key chỉ dùng ở server route `/api/ai/*`, không đưa xuống client.
- Sau khi đổi env, nhớ restart `npm run dev`.

## 5. Chạy local

```bash
npm run dev
```

Mở:

```text
http://localhost:3000
```

## 6. Build production

```bash
npm run build
```

## 7. Lưu ý

- Không commit `.env.local`
- Không commit `node_modules`
- Nếu vừa pull code mới và bị lỗi dependency, chạy lại `npm install`
