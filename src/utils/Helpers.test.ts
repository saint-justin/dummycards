import helpers from './Helpers';

describe('Testing Helpers functions', () => {
  describe('cleanString', () => {
    test('cleanString returns a string', () => {
      const str = 'hello world!';
      const output = helpers.cleanString(str);
      expect(typeof output).toBe('string');
    });

    test('cleanString replaces all spaces with underscores', () => {
      const str1 = 'hello world!';
      const str1Out = helpers.cleanString(str1);
      expect(str1Out).toBe('hello_world!');

      const str2 = 'hello world, how are you doing today?';
      const str2Out = helpers.cleanString(str2);
      expect(str2Out).toBe('hello_world,_how_are_you_doing_today?');

      const str3 = 'HELLO WORLD!';
      const str3Out = helpers.cleanString(str3);
      expect(str3Out).toBe('hello_world!');
    });
  });

  describe('capitalizeFirst', () => {
    test('capitalizeFirst returns a string', () => {
      const str = 'hello world!';
      const output = helpers.capitalizeFirst(str);
      expect(typeof output).toBe('string');
    });

    test('capitalizeFirst replaces the first letter of a string w/ a capital version', () => {
      const str = 'hello world!';
      const strOut = helpers.capitalizeFirst(str);
      expect(strOut).toBe('Hello world!');
    });

    test('capitalizeFirst returns original string if first letter is capitalized', () => {
      const str = 'Hello world!';
      const strOut = helpers.capitalizeFirst(str);
      expect(strOut).toBe('Hello world!');
    });

    test('capitalizeFirst returns original string is first letter is not [a-z]', () => {
      const str1 = '12341234!';
      const str1Out = helpers.capitalizeFirst(str1);
      expect(str1Out).toBe('12341234!');
    });
  });
});
