function occurrences(text, word)  {
  if (!text || text.length === 0) {
    return 0;
  }
  const upper = (count, term) => count + (term.toUpperCase() === word.toUpperCase() ? 1 : 0);
  return text.split(" ").reduce(upper, 0);
}
module.exports = occurrences;
