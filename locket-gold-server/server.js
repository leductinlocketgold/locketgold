const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Đường dẫn tới file submissions.json
const filePath = path.join(__dirname, 'submissions.json');

// Kiểm tra và tự động tạo file submissions.json nếu chưa tồn tại
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8'); // Tạo file với nội dung mảng rỗng
  console.log('File submissions.json đã được tạo.');
}

// Middleware
app.use(bodyParser.json());
app.use(express.static('locket-gold-ui')); // Phục vụ giao diện khách hàng
app.use('/admin', express.static('locket-gold-admin')); // Phục vụ giao diện admin

// API: Lưu dữ liệu biểu mẫu
app.post('/submit-form', (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Đọc dữ liệu hiện tại từ submissions.json
    const submissions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Thêm biểu mẫu mới
    const newSubmission = {
      id: submissions.length + 1,
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    // Ghi lại dữ liệu vào submissions.json
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf-8');

    console.log('Dữ liệu mới đã được lưu:', newSubmission);

    res.status(200).json({ message: 'Biểu mẫu đã được gửi thành công!' });
  } catch (error) {
    console.error('Lỗi khi ghi dữ liệu:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi biểu mẫu.' });
  }
});

// API: Lấy dữ liệu biểu mẫu
app.get('/get-submissions', (req, res) => {
  try {
    const submissions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu.' });
  }
});

// Middleware xử lý lỗi 404 (Trang không tìm thấy)
app.use((req, res) => {
  res.status(404).send('Trang bạn yêu cầu không tồn tại!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
