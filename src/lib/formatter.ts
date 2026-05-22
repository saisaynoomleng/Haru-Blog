export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
    .join(' ');
};
