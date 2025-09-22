import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');


form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const mail = event.currentTarget.elements.email.value;
    const message = event.currentTarget.elements.message.value;
    if (mail === '' || message === '') {
    return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  }
    console.log(`email:${mail}, message:${message}`);
}