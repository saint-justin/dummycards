export default {
  cleanString: (str: string): string => str.replace(/\s/g, '_').toLowerCase(),

  capitalizeFirst: (str: string): string => {
    const arr = str.split('') as string[];
    if (!arr[0].match(/[a-z]/)) return str;
    const first = arr.shift()?.toUpperCase();

    if (!first) throw new Error('Error: Invalid string given to helper function CapitalizeFirst');
    arr.unshift(first);

    const joined = arr.join('');
    return joined;
  },
};
