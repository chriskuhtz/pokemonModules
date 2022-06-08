export const flooredRGBString = (rgb: number[]): string => {
  return `rgb(${rgb.map((r: number) => Math.floor(r)).join()})`;
};
