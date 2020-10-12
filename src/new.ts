interface AnfrageConfig {
  queryInterfaces: object //查询接口集
  noFilter?: boolean //是否关闭的filter功能
  filter?: () => object //自定义filter函数
  interfaceMap?: boolean //查询接口映射
}

interface AnfrageData {
	[interfaceName: string]: Query | Array<Query>
}

interface Query {
	query?: object
	condition?: object
	mutations?: object
	filters?: Array<string>
}

class NewAnfrage {
	private interfaces: object //Query Interface set
	private interfacesKeys: Array<string> //Query Interface set name

	constructor(config: AnfrageConfig) {
		this.interfaces = config.queryInterfaces
	}

	handler(query) {
		//获取查询接口
		this.interfacesKeys = this.getInterfaceKeys(query)

		//遍历查询接口
		for (let interfaceKey of this.interfacesKeys) {
			let curInterfaceVal = this.getInterfaceValue(interfaceKey) //获取当前查询接口的值

			let curInterfaceValType = this.gettype(curInterfaceVal) //获取当前查询条件的数据类型

			switch (curInterfaceValType) {
				case Object:
					break
				case Array:
					break
				case Object:
					break
				case Object:
					break
			}
		}
	}

	getInterfaceKeys(query) {
		return Object.keys(this.interfaces)
	}

	getInterfaceValue(InterfaceName: string) {
		return this.interfaces[InterfaceName]
	}

	isObj(data: any) {}

	isString(data: any) {}

	//判断是否数组
	isArray(data: any): boolean {
		return Array.isArray(data)
	}

	isExist(opt: string, obj: object) {
		return opt in obj
	} //end of isExist

	getType(obj) {
		if (obj == null) {
			return (obj + '').toLowerCase()
		} // implicit toString() conversion
		let deepType = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
		return deepType.match(/array|date|error|function|regexp/ /*|number|string|symbol|bigint|boolean/*/) ? deepType : typeof obj === 'object' || typeof obj === 'function' ? 'object' : deepType
	}

	gettype(obj) {
		let type = typeof obj

		if (type !== 'object') {
			return type
		}
		//如果不是object类型的数据，直接用typeof就能判断出来

		//如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(obj)的方式才能判断
		return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
	}
}


