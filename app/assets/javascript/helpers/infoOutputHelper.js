export const spacer = (text) => {
  const split = text.split('');
  const space =
    String.fromCharCode(8202) +
    String.fromCharCode(8202) +
    String.fromCharCode(8202);
  return split.join(space);
};
