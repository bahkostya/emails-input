import {
  getByText,
  getByPlaceholderText,
  fireEvent,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import EmailsInput from '../emails-input';

describe('EmailsInput class', () => {
  let containerElement;

  beforeEach(() => {
    containerElement = document.createElement('div');
  });

  it('should render input field to target node', () => {
    new EmailsInput(containerElement);

    expect(containerElement).toMatchSnapshot();
  });

  it('should pass placeholder text to input', () => {
    const options = { placeholder: 'test placeholder' };

    new EmailsInput(containerElement, options);

    expect(containerElement.querySelector('input').placeholder).toBe(
      options.placeholder
    );
  });

  it('should pass placeholder text to input', () => {
    const options = { placeholder: 'test placeholder' };

    new EmailsInput(containerElement, options);

    expect(
      getByPlaceholderText(containerElement, options.placeholder)
    ).toBeTruthy();
  });

  it('should add emails to DOM by calling add() method', () => {
    const emailsInput = new EmailsInput(containerElement);
    const validEmail = 'valid.email@test.com';
    const invalidEmail = 'hqwehqehkj123123';

    emailsInput.add(validEmail);
    emailsInput.add(invalidEmail);

    expect(getByText(containerElement, validEmail)).toBeTruthy();
    expect(getByText(containerElement, invalidEmail)).toBeTruthy();
  });

  it('should add email to DOM by typing it and pressing Enter button', () => {
    new EmailsInput(containerElement);
    const inputElement = containerElement.querySelector('input');
    const emailString = 'some-email1@test.com';

    fireEvent.change(inputElement, { target: { value: emailString } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(getByText(containerElement, emailString)).toBeTruthy();
  });

  it('should add email to DOM by typing it and pressing comma button', () => {
    new EmailsInput(containerElement);
    const inputElement = containerElement.querySelector('input');
    const emailString = 'some-email2@test.com';

    fireEvent.change(inputElement, { target: { value: emailString } });
    fireEvent.keyDown(inputElement, { key: ',' });

    expect(getByText(containerElement, emailString)).toBeTruthy();
  });

  it('should add email to DOM by typing it and loosing focus', () => {
    new EmailsInput(containerElement);
    const inputElement = containerElement.querySelector('input');
    const emailString = 'some-email3@test.com';

    fireEvent.change(inputElement, { target: { value: emailString } });
    fireEvent.blur(inputElement);

    expect(getByText(containerElement, emailString)).toBeTruthy();
  });

  it('should add email to DOM and have a proper css class for not valid email', () => {
    const emailsInput = new EmailsInput(containerElement);
    const invalidEmail = 'not______valid.email@^%&*test.com';

    emailsInput.add(invalidEmail);

    expect(getByText(containerElement, invalidEmail)).toHaveClass(
      'chip--invalid'
    );
  });

  it('should return list of all emails', () => {
    const emailsInput = new EmailsInput(containerElement);
    const emails = [
      'firstname.lastname@example.com',
      'plainaddress',
      'email@subdomain.example.com',
      '#@%^%#$@#$@#.com',
      'firstname+lastname@example.com',
      '@example.com',
    ];

    emails.forEach(emailsInput.add);

    expect(emailsInput.getAll()).toMatchSnapshot();
  });

  it('should remove email', () => {
    const emailsInput = new EmailsInput(containerElement);
    const emails = [
      'firstname.lastname@example.com',
      'plainaddress',
      'email@subdomain.example.com',
      '#@%^%#$@#$@#.com',
      'firstname+lastname@example.com',
      '@example.com',
    ];

    emails.forEach(emailsInput.add);

    const emailElement = getByText(containerElement, emails[1]);
    const deleteButtonElement = emailElement.querySelector('button');

    fireEvent.click(deleteButtonElement);

    expect(emailsInput.getAll().length).toBe(emails.length - 1);
  });

  it('should destroy remove input from DOM', () => {
    const emailsInput = new EmailsInput(containerElement);

    emailsInput.destroy();

    expect(containerElement.querySelector('.emails-input')).toBeFalsy();
  });
});
