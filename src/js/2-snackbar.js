import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

console.log(form);

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(e.target.elements.delay.value, 10);
  const state = e.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(resolve => {
      return iziToast.show({
        position: 'topCenter',
        color: 'green',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(error => {
      return iziToast.show({
        position: 'topCenter',
        color: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
