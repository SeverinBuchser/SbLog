function replace(string, indices, character) {
  indices.forEach(index => {
    string = string.substring(0, index).concat(character).concat(string.substring(index + 1));
  })
  return string;
}

module.exports = {
  replace
}
