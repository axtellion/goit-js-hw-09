import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
     resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`)
  }
  })
}



const submitElement = element => {
  const step = element.currentTarget.elements.step.value;
  const delay = element.currentTarget.elements.delay.value;
  const amount = element.currentTarget.elements.amount.value;

  element.preventDefault();

  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, +delay + i * +step)
        .then(message => Notiflix.Notify.success(message))
        .catch(message => Notiflix.Notify.failure(message));
    }, +delay + i * +step);
  }
  element.currentTarget.reset();
}



form.addEventListener('submit', submitElement);