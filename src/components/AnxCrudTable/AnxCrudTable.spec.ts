import { shallowMount, mount } from "@vue/test-utils";
import { Posts } from "@/lib/models/test/Posts";
import { AnxCrudTable, AnxTable } from "@/components";
import { AnxIconsPlugin } from "@/plugins";
import Vue from "vue";
import flushPromises from "flush-promises";

const mockData = [
  {
    userId: 1,
    id: 1,
    title: "First post",
    body:
      "This is the body of the first post\nquia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body:
      "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body:
      "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body:
      "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    userId: 1,
    id: 7,
    title: "The hidden title",
    body:
      "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nsome hidden search text quidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  },
  {
    userId: 1,
    id: 8,
    title: "searchtext_anx in title",
    body:
      "searchtext_anx in body\ndignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
    userId: 1,
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body:
      "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
  },
  {
    userId: 1,
    id: 10,
    title: "Last post",
    body:
      "This is the body of the last post\nquo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  }
];

describe("AnxCrudTable.vue", () => {
  beforeEach(() => {
    Vue.use(AnxIconsPlugin);
    fetchMock.resetMocks();
    fetchMock.mockOnce(JSON.stringify(mockData));
  });

  it("renders component", () => {
    const modelClass = Posts;
    const wrapper = shallowMount(AnxCrudTable, {
      propsData: { modelClass }
    });

    const tableComponent = wrapper.findComponent(AnxTable);
    expect(tableComponent.exists()).toBe(true);
  });

  it("renders component without model class", async () => {
    const wrapper = mount(AnxCrudTable);

    await flushPromises();

    // Table should be rendered
    expect(wrapper.get(".anx-table").exists()).toBeTruthy();

    // But there should be no content
    expect(wrapper.find(".anx-table-row").exists()).toBeFalsy();
  });

  it("displays data received from api endpoint", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, hideColumns: ["abc"], sort: null }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Check if the first table row contains the text
    const tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[0].title);
    expect(tableRow.text()).toContain(mockData[0].body);
  });

  it("has working pagination", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, maxItems: 1, editable: false, deleteable: false }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Check if the first table row contains the text
    let tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[0].title);
    expect(tableRow.text()).toContain(mockData[0].body);

    // Check if the forward button exists and click it
    const forwardButton = wrapper.get(".pagination .page-switch-link.forward");
    expect(forwardButton.exists()).toBeTruthy();
    await forwardButton.trigger("click");

    // Check if the first table row contains the text
    tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[1].title);
    expect(tableRow.text()).toContain(mockData[1].body);
  });

  it("sorts table on sort changed", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: {
        modelClass,
        sort: { name: "id", order: "ASC" }
      }
    });

    await flushPromises();

    // Should be in ascending order
    let tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[0].title);
    expect(tableRow.text()).toContain(mockData[0].body);

    // Change the sort
    await wrapper.setProps({ sort: { name: "id", order: "DESC" } });

    // Should be in descending order
    tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[mockData.length - 1].title);
    expect(tableRow.text()).toContain(mockData[mockData.length - 1].body);

    // Change sort to null (nothing should be changed)
    await wrapper.setProps({ sort: null });
    tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[mockData.length - 1].title);
    expect(tableRow.text()).toContain(mockData[mockData.length - 1].body);
  });

  it("refreshes data on model class change", async () => {
    const wrapper = mount(AnxCrudTable);

    // Empty table should be displayed
    await flushPromises();
    expect(wrapper.get(".anx-table").exists()).toBeTruthy();
    expect(wrapper.find(".anx-table-row").exists()).toBeFalsy();

    // Reset fetch mock
    fetchMock.resetMocks();
    fetchMock.mockOnce(JSON.stringify(mockData));

    // Change the model clas
    await wrapper.setProps({ modelClass: Posts });
    await flushPromises();

    // Check table content
    const tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[0].title);
    expect(tableRow.text()).toContain(mockData[0].body);
  });

  it("hides columns if defined", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, hideColumns: ["title"] }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Check if the first table row contains the text
    const tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[0].body);
    // Title should be hidden
    expect(tableRow.text()).not.toContain(mockData[0].title);
  });

  it("deletes entry", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Reset fetch mock to check for deletion api call
    fetchMock.resetMocks();

    // Click the delete button
    const deleteButton = wrapper.get("#crud-delete-icon-0");
    expect(deleteButton.exists()).toBeTruthy();
    await deleteButton.trigger("click");

    // Confirm the deletion
    const confirmButton = wrapper.get(".anx-modal .confirm-button");
    expect(confirmButton.exists()).toBeTruthy();
    await confirmButton.trigger("click");

    await flushPromises();

    // Check if the enpoint for deletion has been called
    expect(fetchMock.mock.calls[0][0]).toMatch("/api/posts/1");
    expect(fetchMock.mock.calls[0][1]?.method).toMatch("DELETE");
  });

  it("updates entry", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Reset fetch mock to check for deletion api call
    fetchMock.resetMocks();

    // Click the update button
    const updateButton = wrapper.get("#crud-update-icon-0");
    expect(updateButton.exists()).toBeTruthy();
    await updateButton.trigger("click");

    // Confirm the update
    const footerButtons = wrapper.findAll(".anx-modal-footer > .anx-button");
    for (let i = 0; i < footerButtons.length; i++) {
      if (footerButtons.at(i).text() == "Save") {
        await footerButtons.at(i).trigger("click");
        break;
      }
    }

    await flushPromises();

    // Check if the enpoint for deletion has been called
    expect(fetchMock.mock.calls[0][0]).toMatch("/api/posts/1");
    expect(fetchMock.mock.calls[0][1]?.method).toMatch("PUT");
  });

  it("creates entry", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Reset fetch mock to check for deletion api call
    fetchMock.resetMocks();

    // Click the update button
    const createButton = wrapper.get("#crud-create");
    expect(createButton.exists()).toBeTruthy();
    await createButton.trigger("click");

    // Confirm
    const footerButtons = wrapper.findAll(".anx-modal-footer > .anx-button");
    for (let i = 0; i < footerButtons.length; i++) {
      if (footerButtons.at(i).text() == "Save") {
        await footerButtons.at(i).trigger("click");
        break;
      }
    }

    await flushPromises();

    // Check if the enpoint for deletion has been called
    expect(fetchMock.mock.calls[0][0]).toMatch("/api/posts");
    expect(fetchMock.mock.calls[0][1]?.method).toMatch("POST");
  });

  it("has working search function", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, searchColumns: ["body"] }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    const searchInput = wrapper.get(".anx-crud-header .crud-search input");
    expect(searchInput.exists()).toBeTruthy();
    await searchInput.setValue("some hidden search text");
    await searchInput.trigger("input");

    // Check if the first table row contains the text
    const tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[6].title);
    expect(tableRow.text()).toContain(mockData[6].body);
  });

  it("shows error when using wrong search column", async () => {
    console.error = jest.fn();
    const modelClass = Posts;
    const searchColumns = ["wrongColumn"];
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, searchColumns }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // The search field should not be rendered
    const searchInput = wrapper.find(".anx-crud-header .crud-search input");
    expect(searchInput.exists()).toBeFalsy();

    // The console error should have been called
    expect(console.error).toHaveBeenCalledWith(
      `Unknown search column ${searchColumns[0]}! Check if you are using the property properly.`
    );
  });

  it("displays search result only once when found in several columns", async () => {
    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, searchColumns: ["title", "body"] }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    const searchInput = wrapper.get(".anx-crud-header .crud-search input");
    expect(searchInput.exists()).toBeTruthy();
    await searchInput.setValue("searchtext_anx");
    await searchInput.trigger("input");

    // Check if the correct table row is displayed
    const tableRow = wrapper.get(".anx-table-row");
    expect(tableRow.exists()).toBeTruthy();
    expect(tableRow.text()).toContain(mockData[7].title);
    expect(tableRow.text()).toContain(mockData[7].body);

    // Check if there is only one table row displayed
    const rows = wrapper.findAll(".anx-table-row");
    expect(rows).toHaveLength(1);
  });

  it("changes pagination on search", async () => {
    const maxItems = 2;
    const expectedPages = Math.ceil(mockData.length / maxItems);

    const modelClass = Posts;
    const wrapper = mount(AnxCrudTable, {
      propsData: { modelClass, searchColumns: ["title", "body"], maxItems }
    });

    // Data is loaded asynchronously, so we have to flush promises
    await flushPromises();

    // Check page switch text
    const pageSwitch = wrapper.get(".anx-crud-table .page-switch");
    expect(pageSwitch.exists()).toBeTruthy();
    expect(pageSwitch.text()).toContain("1 of " + expectedPages);

    // Search for something and page switch should change
    const searchInput = wrapper.get(".anx-crud-header .crud-search input");
    await searchInput.setValue("searchtext_anx");
    await searchInput.trigger("input");
    expect(pageSwitch.text()).toContain("1 of 1");
  });
});
