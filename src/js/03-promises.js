import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const btn = document.querySelector('button');

// Just design ==============
btn.style.color = 'white';
btn.style.backgroundColor = '#074c7d';
btn.style.height = '35px';
btn.style.width = 'auto';
btn.style.borderRadius = '4px';

inputDelay.style.height = '35px';
inputDelay.style.fontSize = '16px';
inputDelay.style.marginRight = '20px';

inputStep.style.height = '35px';
inputStep.style.fontSize = '16px';
inputStep.style.marginRight = '20px';

inputAmount.style.height = '35px';
inputAmount.style.fontSize = '16px';
inputAmount.style.marginRight = '20px';

Notiflix.Notify.init({
  position: 'center-center',
});

// =======================

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

form.addEventListener('submit', handleSubmit);
