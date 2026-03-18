# MedAssist V3 Frontend Local Setup Guide

Chào mừng bạn gia nhập team Frontend MedAssist v3. Tài liệu này hướng dẫn cách kéo code từ GitHub về máy và chạy dự án ở môi trường local.

---

## 1. Yêu cầu cài đặt trước

Trước khi bắt đầu, hãy chắc chắn máy tính của bạn đã có:

- **Node.js** phiên bản **18.x trở lên**
- **Git**
- **VS Code**

---

## 2. Clone dự án về máy

Mở Terminal (hoặc Git Bash), di chuyển đến thư mục bạn muốn lưu dự án và chạy:

```bash
git clone https://github.com/ten-github-cua-ban/MedAssist-v3.git
```

Sau khi clone xong, di chuyển vào đúng thư mục frontend:

```bash
cd MedAssist-v3/ma-web
```

---

## 3. Cài dependencies

Sau khi kéo code từ GitHub về, thư mục `node_modules` sẽ chưa có sẵn vì team không đẩy thư mục này lên repo.

Chạy lệnh sau để cài toàn bộ thư viện cần thiết cho dự án:

```bash
npm install
```

Hoặc:

```bash
npm i
```

Lệnh này sẽ đọc file `package.json`, tự động tải các thư viện mà dự án đang sử dụng và tạo thư mục `node_modules` trên máy của bạn.

> Quá trình này có thể mất từ 1 đến 3 phút tùy vào tốc độ mạng.

---

## 4. Tạo file môi trường `.env.local`

Dự án sử dụng Firebase để xác thực và kết nối database, vì vậy bạn cần file môi trường để chạy local.

Tạo file mới tên:

```text
.env.local
```

Đặt file này tại thư mục gốc của `ma-web`.

Sau đó xin Leader hoặc đồng nghiệp nội dung file `.env.local` và dán vào. Ví dụ:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=medassist-v3...
# ...
```

---

## 5. Chạy dự án ở local

Sau khi hoàn tất các bước trên, chạy lệnh:

```bash
npm run dev
```

Khi Terminal hiển thị trạng thái sẵn sàng, mở trình duyệt và truy cập:

```text
http://localhost:3000
```

Nếu mọi thứ đúng, giao diện MedAssist v3 sẽ chạy trên máy của bạn.

---

## 6. Tóm tắt lệnh thường dùng

```bash
git clone https://github.com/ten-github-cua-ban/MedAssist-v3.git
cd MedAssist-v3/ma-web
npm install
npm run dev
```

---

## 7. Lưu ý

- Luôn đứng đúng trong thư mục `ma-web` trước khi chạy lệnh
- Không push thư mục `node_modules` lên GitHub
- Nếu thiếu file `.env.local`, dự án có thể không chạy đúng
- Nếu gặp lỗi sau khi pull code mới, hãy thử chạy lại `npm install`

---

Chúc bạn setup thành công và code vui vẻ.
