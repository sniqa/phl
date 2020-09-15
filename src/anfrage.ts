interface Query {
  query?: object
  condition?: object
  mutations?: object
  filters?: Array<string>
}

interface AnfrageConfig {
  interfaces: object
}

interface AnfrageData {
  [interfaceName: string]: Query | Array<Query>
}

interface filtersConfig {
  [option: string]: Array<string | filtersConfig>
}

export class Anfrage {
  private interfaces: object

  constructor(config: AnfrageConfig) {
    this.interfaces = config.interfaces
  }

  //主要处理函数
  async handler(data: AnfrageData) {
    //get interface
    const interfaceNameArray: Array<string> = this.getInterfaceName(data)

    //
    return await this.multipleInterfaceMultipleQuery(interfaceNameArray, data)
  } //end of handler

  //获取接口名称数组
  getInterfaceName(data: AnfrageData): Array<string> {
    return Object.keys(data)
  } //end of getInterface

  //多接口多次查询
  async multipleInterfaceMultipleQuery(
    interfaceNameArray: Array<string>,
    data: AnfrageData
  ): Promise<object> {
    //对接口名称数组进行遍历
    let totalResult: object = {}

    for (let i = 0; i < interfaceNameArray.length; i++) {
      let interfaceName = interfaceNameArray[i]
      let interfaceData = data[interfaceName]
      let result = await this.singleInterfaceMultipleQuery(
        interfaceName,
        interfaceData
      )
      totalResult[interfaceName] = result
    }

    return totalResult
  } //end of multipleInterfaceMultipleQuery

  //单接口多次查询
  async singleInterfaceMultipleQuery(
    interfaceName: string,
    interfaceData: Query | Array<Query>
  ) {
    let resultArray: Array<object> = []

    //是否多次查询
    if (Array.isArray(interfaceData)) {
      for (let i = 0; i < interfaceData.length; i++) {
        let interfacedata = interfaceData[i]
        let result = await this.singleInterfaceMultipleQuery(
          interfaceName,
          interfacedata
        )
        resultArray.push(result)
      }
      return resultArray
    } else {
      return await this.singleInterfaceSigleQuery(interfaceName, interfaceData)
    }
  }

  //单接口单次查询
  async singleInterfaceSigleQuery(interfaceName: string, interfaceData: Query) {
    let result: object = {}
    try {
      result = await this.interfaces[interfaceName](interfaceData)

      const { filters = false } = interfaceData

      if (filters) {
        result = this.filter(filters, result)
      }

      return result

      //过界处理
    } catch (err) {
      return (result = {
        [interfaceName]: "This interface not exist",
      })
    }
  }

  filter(filterArray: Array<string | filtersConfig>, dataBeforFilter: object) {
    let result: object = {}
    //遍历
    for (let i = 0; i < filterArray.length; i++) {
      const filterOpt = filterArray[i]

      //filterOpt为对象时,需要进行递归操作
      if (filterOpt.constructor === Object) {
        let objKey: string = Object.keys(filterOpt)[0] //获取key,只能有一个值
        let objValue: Array<string | filtersConfig> = filterOpt[objKey] //获取值

        //过界处理
        result[objKey] = this.isExist(objKey, dataBeforFilter)
          ? this.filter(objValue, dataBeforFilter[objKey])
          : "Not Exist"

        //filterOpt为字符串时，直接赋值
      } else if (typeof filterOpt === "string") {
        //过界处理
        result[filterOpt] = this.isExist(filterOpt, dataBeforFilter)
          ? dataBeforFilter[filterOpt]
          : "Not Exist"
      }
    }
    return result
  } //end of filter

  //判断对象是否存在某属性
  isExist(opt: string, obj: object) {
    // if (opt in obj) {
    //   return true
    // }
    // return false

    return opt in obj
  } //end of isExist
} //end of Anfrage


//PHL -> JSONROUTE -> RPJ -> ANFRAGE