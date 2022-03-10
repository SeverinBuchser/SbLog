class SbVerticalString {

  get string() {
    return this.strings.reduce((string, character) => string + character, '');
  }

  get length() {
    return this.string.length;
  }

  constructor(strings, index = 0) {
    if (typeof strings == 'string') {
      this.strings = [strings.split('')[index]];
    } else {
      this.strings = strings.map(string => string.substring(index, index + 1));
    }
  }

  get(index) {
    return this.strings[index];
  }

  match(regexp) {
    return this.string.match(regexp);
  }

  matchAll(regexp) {
    return this.string.matchAll(regexp);
  }

  replace(regexp, newSubstrOrFunc) {
    return new SbVerticalString(this.string.replace(regexp, newSubstrOrFunc).split(''));
  }

  concat(...strings) {
    strings = strings.map(string => {
      if (typeof string == 'string') {
        return new SbVerticalString(string.split(''));
      }
      if (!(string instanceof SbVerticalString)) {
        throw new Error('Cannot concatenate a non vertical string to a vertical string!');
      }
      return string
    })
    let newStrings = this.strings;
    strings.forEach(string => {
      newStrings = newStrings.concat(string.strings);
    })
    return new SbVerticalString(newStrings);
  }

  substring(indexA, indexB) {
    return new SbVerticalString(this.strings.slice(indexA, indexB))
  }
}

module.exports = SbVerticalString;
