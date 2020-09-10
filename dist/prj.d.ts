interface Query {
    query?: object;
    condition?: object;
    mutations?: object;
    filters?: Array<string>;
}
interface PrjConfig {
    interfaces: object;
}
interface PrjData {
    [interfaceName: string]: Query | Array<Query>;
}
interface filtersConfig {
    [option: string]: Array<string | filtersConfig>;
}
export declare class Prj {
    private interfaces;
    constructor(config: PrjConfig);
    handler(data: PrjData): Promise<object>;
    getInterfaceName(data: PrjData): Array<string>;
    multipleInterfaceMultipleQuery(interfaceNameArray: Array<string>, data: PrjData): Promise<object>;
    singleInterfaceMultipleQuery(interfaceName: string, interfaceData: Query | Array<Query>): Promise<object>;
    singleInterfaceSigleQuery(interfaceName: string, interfaceData: Query): Promise<object>;
    filter(filterArray: Array<string | filtersConfig>, dataBeforFilter: object): object;
    isExist(opt: string, obj: object): boolean;
}
export {};
//# sourceMappingURL=prj.d.ts.map