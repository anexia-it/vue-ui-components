The **AbstractModel** is an abstract class that should be used as parent class for models. It offers some base functions for handling models (save, update, delete, get). Models derived from the **AbstractModel** can easily be used in combination with the [AnxCrudTable](/vue-ui-components/#/Components/AnxCrudTable). A model could look like follows:

```javascript
import { AbstractModel } from "@anexia/vue-ui-components";

export class Posts extends AbstractModel {
  protected static HOST = "https://jsonplaceholder.typicode.com";
  protected static API_BASE = "/";

  public userId: number | null = null;
  public title: string | null = null;
  public body: string | null = null;
}
```

With this model you can then easily create a CRUD table. See [AnxCrudTable](/vue-ui-components/#/Components/AnxCrudTable) for an example.