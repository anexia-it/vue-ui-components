import { SerializationHelper } from "../utils/SerializationHelper";
import { StringUtils } from "../utils/StringUtils";

export abstract class AbstractModel {
  public id: number | null = null;
  protected static API_BASE = "/api/";
  // By default, the HOST should be empty string. This can be used if you have an external host for your API
  protected static HOST = "";

  /**
   * Get All API endpoint
   * This function is used to fetch all entries via the API
   * Params can additionally be defined
   * When calling the get method, there is likely no instance of the model, so the function is static
   */
  static async getAll({
    params,
    authorization
  }: { params?: Array<string | number>; authorization?: string | null } = {}) {
    let apiUrl = this.HOST + this.API_BASE + StringUtils.toKebabCase(this.name);
    if (params && params.length) {
      params.forEach(param => {
        apiUrl += "/" + param;
      });
    }

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: authorization ? authorization : ""
      }
    });
    const jsonData = await res.json();
    return SerializationHelper.toInstanceArray(this, jsonData);
  }

  /**
   * Get API endpoint
   * This function is used to get an entry via the API
   * It is just a wrapper arround the getAll function, if no param is provided, all entries are fetched
   * When calling the get method, there is likely no instance of the model, so the function is static
   */
  static async get({
    param,
    authorization
  }: {
    param?: string | number;
    authorization?: string | null;
  }) {
    const data: AbstractModel[] = await this.getAll({
      params: param ? [param] : [],
      authorization
    });

    if (!data || data.length === 0) return null;
    else return data[0];
  }

  /**
   * Save API endpoint
   * This is used for saving the data in the model
   * This function is called directly on the model instance and is therefore non static
   */
  public async save({ authorization }: { authorization?: string | null } = {}) {
    return await fetch(
      AbstractModel.HOST +
        AbstractModel.API_BASE +
        StringUtils.toKebabCase(this.constructor.name),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization ? authorization : ""
        },
        body: JSON.stringify(this)
      }
    );
  }

  /**
   * Delete API endpoint
   * This is used to delete an entry
   */
  public async delete({
    authorization
  }: { authorization?: string | null } = {}) {
    return await fetch(
      AbstractModel.HOST +
        AbstractModel.API_BASE +
        StringUtils.toKebabCase(this.constructor.name) +
        "/" +
        this.id,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization ? authorization : ""
        }
      }
    );
  }

  /**
   * Update API endpoint
   * This is used to update an existing entry
   */
  public async update({
    authorization
  }: { authorization?: string | null } = {}) {
    return await fetch(
      AbstractModel.HOST +
        AbstractModel.API_BASE +
        StringUtils.toKebabCase(this.constructor.name) +
        "/" +
        this.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization ? authorization : ""
        },
        body: JSON.stringify(this)
      }
    );
  }
}
