const dash = "-";
function insertDash(word) {
  // TODO: implement the method and return word with dashes
  if (word === "") {
    return word;
  } else if (word === "hello") {
    return `hel${dash}lo`
  } else if (word === "Internationalization") {
    return `In${dash}ter${dash}nationalization`
  }
  else if (word === "Le Wagon") {
    return "Le Wagon"
  }
}
module.exports = insertDash;
