document.getElementById("signup").addEventListener('click', () => {
  const url = "http://localhost:3000/user/register";
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: "post request", email: "post@gmail.com" })
  }).then(res => res.json()).then(data => console.log(data));
});