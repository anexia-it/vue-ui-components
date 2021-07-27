import { mount } from "@vue/test-utils";
import { AnxTable } from "@/components";

// Just for debugging the items
const items = [
  {
    thisIsTheColumnHeader: 40,
    firstName: "Dickerson",
    lastName: "Macdonald",
    company: "anexia"
  },
  {
    thisIsTheColumnHeader: 21,
    firstName: "Larsen",
    lastName: "Shaw",
    company: "anexia"
  },
  {
    thisIsTheColumnHeader: 89,
    firstName: "Geneva",
    lastName: "Wilson",
    company: "anexia"
  },
  {
    thisIsTheColumnHeader: 38,
    firstName: "Jami",
    lastName: "Carney",
    company: "anexia"
  },
  {
    thisIsTheColumnHeader: 40,
    firstName: "Dickerson",
    lastName: "Macdonald",
    company: "anexia"
  },
  {
    thisIsTheColumnHeader: 21,
    firstName: "Larsen",
    lastName: "Shaw",
    company: "anexia"
  }
];

describe("AnxTable.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxTable);

    expect(wrapper.get("table.anx-table").exists()).toBeTruthy();
  });

  it("renders with items", () => {
    const wrapper = mount(AnxTable, {
      propsData: { items }
    });

    // Check if header have been rendered
    const tableHeads = wrapper.get(".anx-table-container thead").findAll("th");
    expect(tableHeads.exists()).toBeTruthy();
    expect(tableHeads.length).toBe(Object.keys(items[0]).length);
    expect(tableHeads.at(0).text()).toMatch("This Is The Column Header");

    // Check if table body has been rendered correctly
    const tableColumns = wrapper
      .get(".anx-table-container tbody")
      .findAll("td");
    expect(tableColumns.exists()).toBeTruthy();
    expect(tableColumns.length).toBe(
      items.length * Object.keys(items[0]).length
    );
    expect(tableColumns.at(1).text()).toMatch(items[0].firstName);
  });

  it("changes column headers when provided", () => {
    const columns = [
      {
        name: "first column",
        index: "thisIsTheColumnHeader"
      },
      {
        name: "second column",
        index: "firstName"
      },
      {
        name: "third column",
        index: "secondName"
      },
      {
        name: "fourth column",
        index: "company"
      }
    ];

    const wrapper = mount(AnxTable, {
      propsData: { items, columns }
    });

    // Now the column headers should differ from the keys in the items objects
    const tableHeads = wrapper.get(".anx-table-container thead").findAll("th");
    expect(tableHeads.exists()).toBeTruthy();
    expect(tableHeads.length).toBe(columns.length);
    expect(tableHeads.at(0).text()).toMatch(columns[0].name);
  });
});
