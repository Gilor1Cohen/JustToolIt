const figlet = require("figlet");
const fancy = require("fancy-text-generator");

function toSmallCaps(text) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 97 && code <= 122
        ? String.fromCharCode(0x1d00 + (code - 97))
        : char;
    })
    .join("");
}

function toCircle(text) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 97 && code <= 122
        ? String.fromCharCode(0x24d0 + (code - 97))
        : char;
    })
    .join("");
}

function toFiglet(text) {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = { toSmallCaps, toCircle, toFiglet };
