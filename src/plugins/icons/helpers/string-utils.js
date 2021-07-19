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
  },

  kebab: text => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();
  },

  removeNewLines: text => {
    return text.replace(/\r?\n|\r/g, "");
  },

  replaceQuotationMarks: text => {
    return text.replace(/"/g, "'");
  },

  replaceWidthAndHeightForSvg: text => {
    /** We only want to replace the width and height
     * property of the first <svg> element, so we extract
     * it from the rest of the string */
    let svgElement = text.substring(
      text.indexOf("<svg "),
      text.indexOf(">") + 1
    );

    /** Replace the width and the height in the svg element */
    svgElement = svgElement
      .replace(/\bwidth='(\d+)'/g, `width='100%'`)
      .replace(/\bheight='(\d+)'/g, `height='100%'`);

    /** Return the whole svg element and insert the modified svg element */
    return text.replace(/<svg [\s\S]*?>/, svgElement);
  }
};
