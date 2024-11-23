async function fetchSubmissions() {
    const response = await fetch('/get-submissions');
    const submissions = await response.json();
  
    const container = document.getElementById('submissions-container');
  
    if (submissions.length === 0) {
      container.innerHTML = '<p>Không có biểu mẫu nào.</p>';
      return;
    }
  
    submissions.forEach((submission) => {
      const div = document.createElement('div');
      div.classList.add('submission');
      div.innerHTML = `
        <h3>${submission.name}</h3>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Phone:</strong> ${submission.phone}</p>
        <p><strong>Message:</strong> ${submission.message}</p>
        <p><strong>Time:</strong> ${new Date(submission.timestamp).toLocaleString()}</p>
      `;
      container.appendChild(div);
    });
  }
  
  fetchSubmissions();