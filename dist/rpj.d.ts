interface Query {
    query?: object;
    condition?: object;
    mutations?: object;
    filters?: Array<string>;
}
interface RpjConfig {
    interfaces: object;
}
interface RpjData {
    [interfaceName: string]: Query | Array<Query>;
}
interface filtersConfig {
    [option: string]: Array<string | filtersConfig>;
}
export declare class Rpj {
    private interfaces;
    constructor(config: RpjConfig);
    handler(data: RpjData): Promise<object>;
    getInterfaceName(data: RpjData): Array<string>;
    multipleInterfaceMultipleQuery(interfaceNameArray: Array<string>, data: RpjData): Promise<object>;
    singleInterfaceMultipleQuery(interfaceName: string, interfaceData: Query | Array<Query>): Promise<object>;
    singleInterfaceSigleQuery(interfaceName: string, interfaceData: Query): Promise<object>;
    filter(filterArray: Array<string | filtersConfig>, dataBeforFilter: object): object;
    isExist(opt: string, obj: object): boolean;
}
export {};
//# sourceMappingURL=rpj.d.ts.map