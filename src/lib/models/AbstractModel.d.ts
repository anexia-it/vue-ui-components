export declare class AbstractModel {
    public id: number | null;
    protected static API_BASE: string;
    protected static HOST: string;
    static getAll(): Array<AbstractModel>;
    static get(): AbstractModel;
    public save(): void;
    public delete(): void;
    public update(): void;
}