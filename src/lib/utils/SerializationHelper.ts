// @ts-nocheck
import { StringUtils } from "./StringUtils";

export class SerializationHelper {
  static toInstance(obj: object, json: string | object) {
    let jsonObj: {};

    if (typeof json === "string") {
      jsonObj = JSON.parse(json);
    } else {
      jsonObj = json;
    }

    Object.keys(jsonObj).forEach((k: string) => {
      const camelized = StringUtils.snakeCaseToCamelCase(k);
      if (camelized !== k) {
        jsonObj[camelized] = jsonObj[k];
        delete jsonObj[k];
      }
    });

    if (typeof obj.constructor.fromJSON === "function") {
      obj.fromJSON(jsonObj);
    } else {
      for (const propName in jsonObj) {
        if (obj.constructor.prototype.hasOwnProperty.call(obj, propName)) {
          obj[propName] = jsonObj[propName];
        }
      }
    }

    return obj;
  }

  static toInstanceArray(Obj: object, json: object[]) {
    const instances: [] = [];
    if (json.length >= 1) {
      json.forEach(jsonObject => {
        instances.push(this.toInstance(new Obj(), jsonObject));
      });
    } else {
      instances.push(this.toInstance(new Obj(), json));
    }
    return instances;
  }

  static toJson(obj: object): object {
    Object.keys(obj).forEach(key => {
      if (StringUtils.camelCaseToSnakeCase(key) !== key) {
        obj[StringUtils.camelCaseToSnakeCase(key)] = obj[key];
        delete obj[key];
      }
    });
    return obj;
  }
}
