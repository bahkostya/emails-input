import { validateEmail } from './validate-email';

const COMMA_KEY = ',';
const ENTER_KEY = 'Enter';

const defaultOptions = {
  placeholder: 'add email...',
};

export default class EmailsInput {
  constructor(parentNode, options = {}) {
    if (!(parentNode instanceof HTMLElement)) {
      throw new TypeError(
        "Failed to execute 'EmailsInput': parameter 1 in constructor is not of type 'HTMLElement'"
      );
    }

    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.parentNode = parentNode;
    this.store = [];

    this.add = this.add.bind(this);
    this.destroy = this.destroy.bind(this);
    this.getAll = this.getAll.bind(this);

    this.createContainer();
    this.addEventListeners();
  }

  destroy() {
    this.parentNode.removeChild(this.containerNode);
    this.eventListeners.forEach((removeListener) => removeListener());
  }

  addEventListeners() {
    const handleFocus = () => {
      this.inputNode.focus();
    };
    const handleBlur = () => {
      this.add(this.inputNode.value);
    };
    const handleInput = (event) => {
      if (event.key === ENTER_KEY || event.key === COMMA_KEY) {
        event.preventDefault();

        this.add(this.inputNode.value);
      }
    };
    const handlePaste = (event) => {
      event.preventDefault();

      const paste = (event.clipboardData || window.clipboardData).getData(
        'text'
      );

      paste.split(',').forEach(this.add);
    };

    this.containerNode.addEventListener('click', handleFocus);
    this.inputNode.addEventListener('blur', handleBlur);
    this.inputNode.addEventListener('keydown', handleInput);
    this.inputNode.addEventListener('paste', handlePaste);

    this.eventListeners = [
      () => this.containerNode.removeEventListener('click', handleFocus),
      () => this.inputNode.removeEventListener('blur', handleBlur),
      () => this.inputNode.removeEventListener('keydown', handleInput),
      () => this.inputNode.removeEventListener('paste', handlePaste),
    ];
  }

  add(emailString) {
    if (typeof emailString !== 'string') {
      throw new TypeError(
        "Failed to execute 'add' on 'EmailsInput': parameter 1 is not of type 'string'"
      );
    }

    const trimmedEmailString = emailString && emailString.trim();

    if (!trimmedEmailString) {
      return;
    }

    this.inputNode.value = null;

    const isExistingEmail = this.store.some(
      ({ email }) => email === trimmedEmailString
    );

    if (isExistingEmail) {
      return;
    }

    const isValid = validateEmail(trimmedEmailString);

    this.createChipElement(trimmedEmailString, isValid);
    this.addToStore({ email: trimmedEmailString, isValid });
  }

  addToStore({ email, isValid }) {
    this.store.push({ email, isValid });
  }

  removeFromStore(emailString) {
    this.store = this.store.filter(({ email }) => email !== emailString);
  }

  createChipElement(emailString, isValid) {
    const chipElement = document.createElement('span');
    chipElement.classList.add('chip');
    chipElement.appendChild(document.createTextNode(emailString));
    if (!isValid) {
      chipElement.classList.add('chip--invalid');
    }

    const chipButtonElement = document.createElement('button');
    chipButtonElement.setAttribute('aria-label', 'Delete');
    chipButtonElement.classList.add('chip__button');
    chipButtonElement.innerHTML = `
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="chip-remove" fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038" />
      </svg>
    `;

    const handleDelete = () => {
      chipButtonElement.removeEventListener('click', handleDelete);
      this.containerNode.removeChild(chipElement);
      this.removeFromStore(emailString);
    };
    chipButtonElement.addEventListener('click', handleDelete);

    this.eventListeners.push(() =>
      chipButtonElement.removeEventListener('click', handleDelete)
    );

    chipElement.appendChild(chipButtonElement);

    this.inputNode.insertAdjacentElement('beforebegin', chipElement);
  }

  createContainer() {
    const inputNode = document.createElement('input');
    inputNode.classList.add('emails-input__input');
    inputNode.setAttribute('type', 'text');
    inputNode.setAttribute('placeholder', this.options.placeholder);

    const containerNode = document.createElement('div');
    containerNode.classList.add('emails-input');
    containerNode.appendChild(inputNode);

    this.parentNode.innerHTML = '';
    this.parentNode.appendChild(containerNode);
    this.containerNode = containerNode;
    this.inputNode = inputNode;
  }

  getAll() {
    return this.store;
  }
}
