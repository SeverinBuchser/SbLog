function border() {
  return lines => {
    lines.splice(0, 0, '-'.repeat(lines.width));
    lines.pushUnformatted('-'.repeat(lines.width));
    return lines.map((line, index) => {
      if (index == 0 || index == lines.height - 1) {
        return '+-' + line + '-+'
      } else {
        return  '\u2502 ' + line + ' \u2502';
      }
    });
  }
}

module.exports = {
  border
}
