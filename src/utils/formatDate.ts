export function formatDate(date: Date) {
  const options = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
  };
  return new Date(date).toLocaleDateString('en-US', options);
}
 