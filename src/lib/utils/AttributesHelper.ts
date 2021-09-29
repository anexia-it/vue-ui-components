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
  /**
   * Attrbibutes for the component
   * This functions only searches for specific attributes (id, name)
   */
  id!: string | null;
  static attributes(instance: {
    id?: string | null;
    name?: string | null;
  }): {} {
    const attributes: { id?: string; name?: string } = {};

    if ("id" in instance && instance.id && instance.id !== "") {
      attributes.id = instance.id;
    }

    if ("name" in instance && instance.name && instance.name !== "") {
      attributes.name = instance.name;
    }

    return attributes;
  }
}
