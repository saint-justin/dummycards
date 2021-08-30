// Returns a variant of the original string with spaces replace with underscores
export const cleanString = (str: string): string => str.replace(/\s/g, '_').toLowerCase();

// Capitalizes the first letter of a given string
export const capitalizeFirst = (str: string): string => {
  const arr = str.split('') as string[];

  if (!arr[0].match(/[a-z]/)) return str;
  const first = arr.shift()?.toUpperCase();

  if (!first) throw new Error('Error: Invalid string given to helper function CapitalizeFirst');
  arr.unshift(first);

  const joined = arr.join('');
  return joined;
};

// Capitalizes the first letter of all words seperated by spaces
export const titleCase = (str: string): string => {
  const arr = str.split(' ');
  const replacement = arr.map((word: string) => capitalizeFirst(word));
  return replacement.join(' ');
};
