import fetchMock from "jest-fetch-mock"
import { AbstractModel } from "@/lib/models/AbstractModel";

// This is a simple test model extending the Abstract Model
class TestModel extends AbstractModel {
    protected static HOST = "https://jsonplaceholder.typicode.com";
    protected static API_BASE = "/api";
  
    public content: string | null = null;
}

// This is the test data that will be injected via fetchMock
const testData = [
    { id: 1, content: 'test1' },
    { id: 2, content: 'test2' },
    { id: 3, content: 'test3' },
    { id: 4, content: 'test4' },
    { id: 5, content: 'test5' }
]

describe("AbstractModel", () => {
    it("fetches entry", async () => {
        // Mocking fetch and injecting test data
        fetchMock.mockResponseOnce(JSON.stringify(testData));

        // API request to fetch data
        let data: TestModel | null = (await TestModel.get({ param: 1 })) as TestModel

        expect(data).toBeTruthy();
        expect(data?.id).toBe(testData[0].id);
        expect(data.content).toBe(testData[0].content);
    });

    it("fetches all entries", async () => {
        // Mocking fetch and injecting test data
        fetchMock.mockResponseOnce(JSON.stringify(testData));

        // API request to fetch data
        const data: TestModel[] = (await TestModel.getAll()) as TestModel[]
        
        expect(data).toBeTruthy();
        expect(data.length).toBe(testData.length);
        expect(data[0].content).toBe(testData[0].content);
    });

    // TODO: test for save, delete, update and authorization check
    // it("has correct authoriztation", async () => {

    // });
});
