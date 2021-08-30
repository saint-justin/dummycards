import { cleanString, capitalizeFirst, titleCase } from '../Helpers';

describe('Testing Helpers functions', () => {
  describe('cleanString', () => {
    test('cleanString returns a string', () => {
      const str = 'hello world!';
      const output = cleanString(str);
      expect(typeof output).toBe('string');
    });

    test('cleanString replaces all spaces with underscores', () => {
      const str1 = 'hello world!';
      const str1Out = cleanString(str1);
      expect(str1Out).toBe('hello_world!');

      const str2 = 'hello world, how are you doing today?';
      const str2Out = cleanString(str2);
      expect(str2Out).toBe('hello_world,_how_are_you_doing_today?');

      const str3 = 'HELLO WORLD!';
      const str3Out = cleanString(str3);
      expect(str3Out).toBe('hello_world!');
    });
  });

  describe('capitalizeFirst', () => {
    test('capitalizeFirst returns a string', () => {
      const str = 'hello world!';
      const output = capitalizeFirst(str);
      expect(typeof output).toBe('string');
    });

    test('capitalizeFirst replaces the first letter of a string w/ a capital version', () => {
      const str = 'hello world!';
      const strOut = capitalizeFirst(str);
      expect(strOut).toBe('Hello world!');
    });

    test('capitalizeFirst returns original string if first letter is capitalized', () => {
      const str = 'Hello world!';
      const strOut = capitalizeFirst(str);
      expect(strOut).toBe('Hello world!');
    });

    test('capitalizeFirst returns original string is first letter is not [a-z]', () => {
      const str1 = '12341234!';
      const str1Out = capitalizeFirst(str1);
      expect(str1Out).toBe('12341234!');
    });
  });

  describe('titleCase', () => {
    test('titleCase returns a string', () => {
      const str = 'hello!';
      const output = titleCase(str);
      expect(typeof output).toBe('string');
    });

    test('titleCase replaces the first letter of a string w/ a capital version', () => {
      const str = 'hello!';
      const strOut = titleCase(str);
      expect(strOut).toBe('Hello!');
    });

    test('titleCase returns first letter of each string w/ a capital version', () => {
      const str = 'Hello world!';
      const strOut = titleCase(str);
      expect(strOut).toBe('Hello World!');
    });

    test('titleCase returns original string is first letter is not [a-z]', () => {
      const str1 = '12341234!';
      const str1Out = titleCase(str1);
      expect(str1Out).toBe('12341234!');
    });
  });
});
