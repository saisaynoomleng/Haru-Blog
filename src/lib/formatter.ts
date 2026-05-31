export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
    .join(' ');
};

export const formatCurrency = (currency: number): string => {
  return new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency',
  }).format(currency);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getInitials = (
  name: string | undefined,
): string | undefined | null => {
  return (
    name &&
    name
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((w) => w[0].toUpperCase())
      .join(' ')
  );
};
