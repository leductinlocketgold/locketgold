document.getElementById('locketGoldForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const submission = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value,
    };
  
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
  
    if (response.ok) {
      alert('Biểu mẫu đã được gửi!');
      document.getElementById('locketGoldForm').reset();
    } else {
      alert('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  });