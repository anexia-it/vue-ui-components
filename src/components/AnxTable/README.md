### Simple table

The *anx-table* can be modified regarding its design. You have many options to adapt the design of the table. Below you can test what each property does. The *anx-table* is also very straight forward. You don't need much code to render a table with your data.

```vue
<template>
    <div>
        <anx-form>
            <anx-form-container>
                <anx-checkbox v-model="tableOptions.bordered" name="bordered" />
                <anx-checkbox v-model="tableOptions.borderless" name="borderless" />
                <anx-checkbox v-model="tableOptions.stripped" name="stripped" />
                <anx-checkbox v-model="tableOptions.hover" name="hover" />
                <anx-checkbox v-model="tableOptions.noHeader" name="no-header" />
            </anx-form-container>
        </anx-form>

        <anx-table
            :items="tableItems"
            :bordered="tableOptions.bordered === true ? true : null"
            :borderless="tableOptions.borderless === true ? true : null"
            :stripped="tableOptions.stripped === true ? true : null"
            :hover="tableOptions.hover === true ? true : null"
            :noHeader="tableOptions.noHeader === true ? true : null"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // These are the options for the table
            tableOptions:{
                bordered: null,
                borderless: null,
                stripped: null,
                hover: null,
                noHeader: null
            },
            // These are the items for the table
            tableItems: [
                { age: 40, firstName: "Dickerson", lastName: "Macdonald" },
                { age: 21, firstName: "Larsen", lastName: "Shaw" },
                { age: 89, firstName: "Geneva", lastName: "Wilson" },
                { age: 38, firstName: "Jami", lastName: "Carney" },
                { age: 40, firstName: "Dickerson", lastName: "Macdonald" },
                { age: 21, firstName: "Larsen", lastName: "Shaw" }
            ]
        }
    }
}
</script>
```

### Passing data

In general, the <strong>items</strong> property is used to pass the data of to the <i>&lt;anx-table&gt;</i>. The component automatically creates columns with headers depending on the structure of the array passed at <strong>items</strong>. So, passing an array of objects via the <strong>item</strong> property to the table like in the example above would be enough for <i>&lt;anx-table&gt;</i> to work properly.<br /><br />

You also have the possibility to edit the names and the style of each individual column. Therefore the <strong>columns</strong> property is used. The columns property also is an array of objects. Each object represents one column in the table (See table above). <strong>width</strong>, <strong>align</strong> and the header for the column <strong>name</strong> can be defined. Every column object must have the <strong>index</strong> property. This property binds the data of items to the respective column. (<strong>Note: </strong> <i>&lt;anx-table&gt;</i> won't work properly if you only pass the columns property and no items).

The following example shows how to set custom column headers and adapt the design of the header:

```vue
<template>
    <anx-table
        :columns="columns"
        :items="tableItems"
        stripped
        hover
    />
</template>

<script>
export default {
    data() {
        return {
            // These are the items for the table (Note that the keys of each property don't match the colum names now!)
            tableItems: [
                { a: 40, b: "Dickerson", c: "Macdonald", d: "anexia" },
                { a: 21, b: "Larsen", c: "Shaw", d: "anexia" },
                { a: 89, b: "Geneva", c: "Wilson", d: "anexia" },
                { a: 38, b: "Jami", c: "Carney", d: "anexia" },
                { a: 40, b: "Dickerson", c: "Macdonald", d: "anexia" },
                { a: 21, b: "Larsen", c: "Shaw", d: "anexia" }
            ],
            // These are the options for the column ()
            columns: [
                {
                    name: "AGE", // The name to be displayed as header
                    index: "a", // The index of the data in the items property
                    width: "50px", // The width of the column
                    align: "center", // The align of the column header
                },
                { name: "FIRST NAME", index: "b", align: "center"},
                { name: "LAST NAME", index: "c", align: "center"},
                { name: "COMPANY", index: "d", width: "50px", align: "right"},
            ]
        }
    }
}
</script>
```

### Using scopes

The following table is a little bit more complex. This table also has a <strong>scrollable</strong> property. This makes the table scrollable. The table is also limited to a size of 200 px. The first column is limited to a width of 50px.<br /><br />

But the main focus of this example is to show how to use the scopes of the table correctly. You have the possibility, to render inline html and change the content of the different cells. Therefore, named slots are used. The name of the slot is as follows:
<strong>$columnname$rowIndex</strong>. E.g. age0 for first row and the column with the ages. Inside this slot you can add whatever you want (images, inline html, ...). The images can be changed dynamically. This is demonstrated with an intervall of four seocnds.

```vue
<template>
    <anx-table
        stripped
        hover
        bordered
        scrollable
        uppercase-title
        height="200px"
        :items="tableItems"
        :widths="{ age: '50px' }"
    >
        <!-- This is an example for replacing content. In this case we change the styling for a specific cell -->
        <template v-slot:firstName2="{ content }">
            <span style="color: #003CA6">
                <strong>{{ content }}</strong> <!-- This is how you access the content that currently is in the cell -->
            </span>
        </template>

        <!-- Replace all cells with images with an image -->
        <template
            v-for="(item, i) in tableItems"
            v-slot:[getImgCellName(i)]="{ content }"
        >
            <anx-icon :icon="content" :key="i" width="25px" />
        </template>
    </anx-table>
</template>

<script>
export default {
    data() {
        return {
            // These are the items for the table
            tableItems: [
                { age: 40, firstName: "Dickerson", lastName: "Macdonald", image: "anexia" },
                { age: 21, firstName: "Larsen", lastName: "Shaw", image: "idee" },
                { age: 89, firstName: "Geneva", lastName: "Wilson", image: "eins" },
                { age: 38, firstName: "Jami", lastName: "Carney", image: "stern" },
                { age: 40, firstName: "Dickerson", lastName: "Macdonald", image: "check" },
                { age: 21, firstName: "Larsen", lastName: "Shaw", image: "like" }
            ]
        }
    },
    methods: {
        // This helper function simply returns the current cell name
        getImgCellName(index) {
            return "image" + index;
        }
    }
}
</script>
```