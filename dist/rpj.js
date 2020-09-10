"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpj = void 0;
class Rpj {
    constructor(config) {
        this.interfaces = config.interfaces;
    }
    //主要处理函数
    handler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //get interface
            const interfaceNameArray = this.getInterfaceName(data);
            //
            return yield this.multipleInterfaceMultipleQuery(interfaceNameArray, data);
        });
    } //end of handler
    //获取接口名称数组
    getInterfaceName(data) {
        return Object.keys(data);
    } //end of getInterface
    //多接口多次查询
    multipleInterfaceMultipleQuery(interfaceNameArray, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //对接口名称数组进行遍历
            let totalResult = {};
            for (let i = 0; i < interfaceNameArray.length; i++) {
                let interfaceName = interfaceNameArray[i];
                let interfaceData = data[interfaceName];
                let result = yield this.singleInterfaceMultipleQuery(interfaceName, interfaceData);
                totalResult[interfaceName] = result;
            }
            return totalResult;
        });
    } //end of multipleInterfaceMultipleQuery
    //单接口多次查询
    singleInterfaceMultipleQuery(interfaceName, interfaceData) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultArray = [];
            //是否多次查询
            if (Array.isArray(interfaceData)) {
                for (let i = 0; i < interfaceData.length; i++) {
                    let interfacedata = interfaceData[i];
                    let result = yield this.singleInterfaceMultipleQuery(interfaceName, interfacedata);
                    resultArray.push(result);
                }
                return resultArray;
            }
            else {
                return yield this.singleInterfaceSigleQuery(interfaceName, interfaceData);
            }
        });
    }
    //单接口单次查询
    singleInterfaceSigleQuery(interfaceName, interfaceData) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                result = yield this.interfaces[interfaceName](interfaceData);
                const { filters = false } = interfaceData;
                if (filters) {
                    result = this.filter(filters, result);
                }
                return result;
                //过界处理
            }
            catch (err) {
                return (result = {
                    [interfaceName]: "This interface not exist",
                });
            }
        });
    }
    filter(filterArray, dataBeforFilter) {
        let result = {};
        //遍历
        for (let i = 0; i < filterArray.length; i++) {
            const filterOpt = filterArray[i];
            //filterOpt为对象时,需要进行递归操作
            if (filterOpt.constructor === Object) {
                let objKey = Object.keys(filterOpt)[0]; //获取key,只能有一个值
                let objValue = filterOpt[objKey]; //获取值
                //过界处理
                result[objKey] = this.isExist(objKey, dataBeforFilter)
                    ? this.filter(objValue, dataBeforFilter[objKey])
                    : "Not Exist";
                //filterOpt为字符串时，直接赋值
            }
            else if (typeof filterOpt === "string") {
                //过界处理
                result[filterOpt] = this.isExist(filterOpt, dataBeforFilter)
                    ? dataBeforFilter[filterOpt]
                    : "Not Exist";
            }
        }
        return result;
    } //end of filter
    //判断对象是否存在某属性
    isExist(opt, obj) {
        // if (opt in obj) {
        //   return true
        // }
        // return false
        return opt in obj;
    } //end of isExist
} //end of Phl
exports.Rpj = Rpj;
