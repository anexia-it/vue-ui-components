module.exports = {
  camelize: text => {
    text = text.split("_").join("-");
    const words = text.split("-");

    let result = "";
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      result += module.exports.capitalize(word);
    }

    return result;
  },

  capitalize: text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
};
