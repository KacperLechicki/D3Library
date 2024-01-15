export function toRGB(color: string): string {
  if (color) {
    const hex = color.substring(1, color.length);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b].toString();
  }

  return '69, 137, 247';
}
