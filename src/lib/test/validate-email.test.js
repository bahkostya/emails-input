import { validateEmail } from '../validate-email';

const validEmails = [
  'email@example.com',
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'firstname+lastname@example.com',
  '"email"@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.name',
  'email@example.museum',
  'email@example.co.jp',
  'firstname-lastname@example.com',
];

const invalidEmails = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@111.222.333.44444',
  'email@example..com',
  'Abc..123@example.com',
];

describe('Email validation', () => {
  it('Should return "true" if email is valid', () => {
    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  it('Should return "false" if email if not valid', () => {
    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
