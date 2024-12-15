export function getIds(input: string): string[] {
  const ids = input.split(',').map((id) => id.trim());
  return ids;
}
