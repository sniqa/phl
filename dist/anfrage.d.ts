interface Query {
    query?: object;
    condition?: object;
    mutations?: object;
    filters?: Array<string>;
}
interface AnfrageConfig {
    interfaces: object;
}
interface AnfrageData {
    [interfaceName: string]: Query | Array<Query>;
}
interface filtersConfig {
    [option: string]: Array<string | filtersConfig>;
}
export declare class Anfrage {
    private interfaces;
    constructor(config: AnfrageConfig);
    handler(data: AnfrageData): Promise<object>;
    getInterfaceName(data: AnfrageData): Array<string>;
    multipleInterfaceMultipleQuery(interfaceNameArray: Array<string>, data: AnfrageData): Promise<object>;
    singleInterfaceMultipleQuery(interfaceName: string, interfaceData: Query | Array<Query>): Promise<object>;
    singleInterfaceSigleQuery(interfaceName: string, interfaceData: Query): Promise<object>;
    filter(filterArray: Array<string | filtersConfig>, dataBeforFilter: object): object;
    isExist(opt: string, obj: object): boolean;
}
export {};
//# sourceMappingURL=anfrage.d.ts.map