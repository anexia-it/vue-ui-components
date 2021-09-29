/**
 * Some components have attributes, that should only be set if they are not null.
 * This helper class generates an object, containing only those attributes, that are not null and should be passed to the component.
 * E.g: If the id is not set, no id should be used for the component.
 * You can bind the attributes object to the component using the v-bind directive.
 *
 * @export
 * @class AttributesHelper
 */
export class AttributesHelper {
  /** The counter for unique ids */
  static counter = 1;

  /**
   * Attrbibutes for the component
   * This functions only searches for specific attributes (id, name)
   *
   * Options:
   *   - uniqueId: Generate a unique id if notihing is specified
   *   - uniqueIdPrefix: The prefix for the unique id
   */
  static attributes(
    instance: {
      id?: string | null;
      name?: string | null;
    },
    options?: { uniqueId?: boolean; uniqueIdPrefix?: string }
  ): { id?: string; name?: string } {
    const attributes: { id?: string; name?: string } = {};

    /** Check if id is set */
    if ("id" in instance && instance.id && instance.id !== "") {
      attributes.id = instance.id;
    } else if (options && options.uniqueId === true) {
      /** Assign a unique id based on the counter */
      attributes.id = AttributesHelper.getUniqueId({
        prefix: options.uniqueIdPrefix
      });
    }

    /** Check if the name is set */
    if ("name" in instance && instance.name && instance.name !== "") {
      attributes.name = instance.name;
    }

    return attributes;
  }

  /**
   * This function generates a unique id
   *
   * @static
   * @param {{ prefix?: string }} options
   * @return {*}  {string}
   * @memberof AttributesHelper
   */
  static getUniqueId(options: { prefix?: string }): string {
    let id = "";
    if (options.prefix && typeof options.prefix !== undefined) {
      id += options.prefix;
    } else {
      id += "anx-component-";
    }

    id += AttributesHelper.counter.toString();
    AttributesHelper.counter++;

    return id;
  }
}
