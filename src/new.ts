interface AnfrageConfig {
  queryInterfaces: object //查询接口集
  noFilter?: boolean //是否关闭的filter功能
  filter?: () => object //自定义filter函数
  interfaceMap?: boolean //查询接口映射
}

class NewAnfrage {
  private qis: object //Query Interface set
  private qisn: Array<string> //Query Interface set name

  constructor(config: AnfrageConfig) {
    this.qis = config.queryInterfaces
  }

  getQiskeys() {
    return Object.keys(this.qis)
  }

  getQisValue(queryInterfaceName: string) {
    return this.qis[queryInterfaceName]
  }

  isObj(data: any) {}

  isString(data: any) {}

  //判断是否数组
  isArray(data: any): boolean {
    return Array.isArray(data)
  }

  getType(obj) {
    if (obj == null) {
      return (obj + "").toLowerCase()
    } // implicit toString() conversion
    let deepType = Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase()
    return deepType.match(
      /array|date|error|function|regexp/ /*|number|string|symbol|bigint|boolean/*/
    )
      ? deepType
      : typeof obj === "object" || typeof obj === "function"
      ? "object"
      : deepType
  }
}

function gettype(obj) {
  let type = typeof obj

  if (type !== "object") {
    return type
  }
  //如果不是object类型的数据，直接用typeof就能判断出来

  //如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(obj)的方式才能判断
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, "$1")
}
