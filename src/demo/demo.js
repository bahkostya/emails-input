import './demo.css';

document.addEventListener('DOMContentLoaded', function () {
  const inputContainerNode = document.querySelector('#emails-input');
  const emailsInput = window.EmailsInput(inputContainerNode, {
    placeholder: 'add more people...',
  });

  window.emailsInput = emailsInput;

  document
    .querySelector('[data-button="add-email"]')
    .addEventListener('click', () => {
      const randomEmail = `${Math.random().toString(36).substring(7)}@miro.com`;
      emailsInput.add(randomEmail);
    });

  document
    .querySelector('[data-button="get-emails-count"]')
    .addEventListener('click', () => {
      const validEmails = emailsInput
        .getAll()
        .filter(({ isValid }) => !!isValid);

      alert(`Number of valid emails: ${validEmails.length}`);
    });
});
