class Counter {
  constructor(text) {
    // TODO: build an internal Map of word => occurrences.
    this.map = new Map();
    if (text && text.length > 0) {
      text.split(" ").forEach((item) => {
        const upper = item.toUpperCase();
        this.map.set(upper, (this.map.get(upper) || 0) + 1);
      });
    }
  }

  occurrences(word) {
    // TODO: return the number of occurrences
    return this.map.get(word.toUpperCase()) || 0;
  }
}

module.exports = Counter;
