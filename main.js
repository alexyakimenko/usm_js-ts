function isPangram(sentence) {
  const letters = sentence.toLowerCase().match(/[a-z]/g);
  const charSet = new Set(letters);
  return charSet.size === 26;
}