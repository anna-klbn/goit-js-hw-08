import throttle from 'lodash.throttle';

// ключ, під яким зберігається стан форми в localStorage
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

// обʼєкт із даними форми (береться з localStorage, якщо є, або порожній {})
let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// всі елементи форми. Через деструктуризацію ми одразу беремо email і message.
const { email, message } = form.elements;

// (натискання кнопки відправки) викликається onFormSubmit
form.addEventListener('submit', onFormSubmit);
// При input (коли вводяться дані в поля), але не частіше ніж раз на 500 мс
form.addEventListener('input', throttle(onInputData, 500));
reloadPage();

// Коли користувач вводить текст у форму, дані записуються в dataForm.
// Потім ці дані зберігаються в localStorage
function onInputData(event) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}


function onFormSubmit(event) {
    event.preventDefault();

    console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  }

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  dataForm = {};
}

// При завантаженні сторінки підтягує дані з localStorage і підставляє їх у форму.
// Якщо даних немає — підставляє порожній рядок.
function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}