export class StringUtils {
  static snakeCaseToCamelCase(str: string): string {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  }

  static camelCaseToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  static toKebabCase(str: string): string {
    const matches = str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );
    let kebabCaseString = "";
    if (matches) {
      matches.map(x => x.toLowerCase());
      kebabCaseString = matches.join("-");
    } else {
      return str;
    }
    return kebabCaseString.toLowerCase();
  }
}
