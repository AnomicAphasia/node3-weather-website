console.log('Client side JS file is loaded!');

const weatherInput = document.querySelector('form');

weatherInput.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('.weather__input').value;
  const messageOne = document.querySelector('#message-one');
  const messageTwo = document.querySelector('#message-two');

  messageOne.textContent = 'Loading...';
  messageTwo.innerHTML = '';

  fetch(`http://localhost:3000/weather?address=${input}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.innerHTML = '';
      } else {
        const temps = data.data;
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.innerHTML = `<div>Currently: ${temps.currently}</div><div>Feels Like: ${temps.feelslike}</div><div>Precipitation: ${temps.precip}</div><div>${temps.description}</div>`;
      }
    });
  });
});
