interface Query {
    query?: object;
    condition?: object;
    mutations?: object;
    filters?: Array<string>;
}
interface PhlConfig {
    interfaces: object;
}
interface PhlData {
    [interfaceName: string]: Query | Array<Query>;
}
interface filtersConfig {
    [option: string]: Array<string | filtersConfig>;
}
export declare class Phl {
    private interfaces;
    constructor(config: PhlConfig);
    handler(data: PhlData): Promise<object>;
    getInterfaceName(data: PhlData): Array<string>;
    multipleInterfaceMultipleQuery(interfaceNameArray: Array<string>, data: PhlData): Promise<object>;
    singleInterfaceMultipleQuery(interfaceName: string, interfaceData: Query | Array<Query>): Promise<object>;
    singleInterfaceSigleQuery(interfaceName: string, interfaceData: Query): Promise<object>;
    filter(filterArray: Array<string | filtersConfig>, dataBeforFilter: object): object;
    isExist(opt: string, obj: object): boolean;
}
export {};
//# sourceMappingURL=phl.d.ts.map