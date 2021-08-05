import { AbstractModel } from "../AbstractModel";

export class Posts extends AbstractModel {
  protected static HOST = "https://jsonplaceholder.typicode.com";
  protected static API_BASE = "/";

  public userId: number | null = null;
  public title: string | null = null;
  public body: string | null = null;
}
