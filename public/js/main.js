document.getElementById("login").addEventListener("click", function () {
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = data.redirectUrl;
        } else {
          document.getElementById("errorMessage").innerText = data.errorMessage;
        }
      })
      .catch(error => console.error('Error:', error));
  });
  