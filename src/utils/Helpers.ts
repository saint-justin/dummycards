export default {
  cleanString: (str: string): string => `entry_ ${str.replace(/\s/g, '_').toLowerCase()}`,
};
