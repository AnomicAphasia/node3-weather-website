const weatherInput = document.querySelector('form');

weatherInput.addEventListener('submit', e => {
  e.preventDefault();

  const input = document.querySelector('.weather__input').value;
  const messageOne = document.querySelector('#message-one');
  const messageTwo = document.querySelector('#message-two');

  messageOne.textContent = 'Loading...';
  messageTwo.innerHTML = '';

  fetch(`/weather?address=${input}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.innerHTML = '';
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.innerHTML = data.data;
      }
    });
  });
});
