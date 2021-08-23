When using the *anx-crud-table* you only have to pass the model class and all the data will automatically be loaded. It is important, that the modal class is a child class of the **AbstractModel** class.  

The following example shows a standard crud table with **DESC** sorting based on the id and **search functionality**.

```vue
<template>
  <anx-container width="1000px">
    <anx-content>
      <anx-crud-table
          :modelClass="postsModelClass"
          :sort="{ name: 'id', order: 'DESC' }"
          :hideColumns="['userId']"
          :maxItems="5"
          :searchColumns="['title','body']"
      />
    </anx-content>
  </anx-container>
</template>

<script>
import { Posts } from "@/lib/models/test/Posts";

export default {
  data() {
    return {
        postsModelClass: Posts
    }
  }
}
</script>
```

You also have the possibilty to override some slots (all slots are described above). The example below shows how to create a **custom edit modal**.

```vue
<template>
  <anx-container width="1000px">
    <anx-content>
      <anx-crud-table
          :modelClass="postsModelClass"
          :sort="{ name: 'id', order: 'DESC' }"
          @editActionClicked="showEditModal = true"
          :maxItems="3"
      >
        <template slot="editModal">
            <div>
              <anx-modal
                  v-if="showEditModal"
                  @close="showEditModal = false"
                  size="xxl"
              >
                <h1>Example of a custom modal!</h1>
              </anx-modal>
            </div>
        </template>
      </anx-crud-table>
    </anx-content>
  </anx-container>
</template>

<script>
import { Posts } from "@/lib/models/test/Posts";

export default {
  data() {
    return {
        showEditModal: false,
        postsModelClass: Posts
    }
  }
}
</script>
```