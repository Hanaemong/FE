export const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};
