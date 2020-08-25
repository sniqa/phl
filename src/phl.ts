interface Query {
	query?: object
	condition?: object
	mutations?: object
	filters?: Array<string>
}

interface PhlConfig {
	interfaces: object
}

interface PhlData {
	[interfaceName: string]: Query | Array<Query>
}

export class Phl {
	private interfaces: object

	constructor(config: PhlConfig) {
		this.interfaces = config.interfaces
	}

	//主要处理函数
	async handler(data: PhlData) {
		//get interface
		const interfaceNameArray: Array<string> = this.getInterfaceName(data)

		//
		const result = await this.multipleInterfaceMultipleQuery(interfaceNameArray, data)

		//filter

		return result
	} //end of handler

	//获取接口名称数组
	getInterfaceName(data: PhlData): Array<string> {
		return Object.keys(data)
	} //end of getInterface

	//多接口多次查询
	async multipleInterfaceMultipleQuery(interfaceNameArray: Array<string>, data: PhlData): Promise<object> {
		//对接口名称数组进行遍历
		interfaceNameArray.forEach(async (interfaceName) => {
			let interfaceData = data[interfaceName]

			const result = await this.singleInterfaceMultipleQuery(interfaceName, interfaceData)
		}) //end of interfaceArray.forEach

		return
	} //end of sendData

	//单接口多次查询
	async singleInterfaceMultipleQuery(interfaceName: string, interfaceData: Query | Array<Query>) {
		let resultArray: Array<object>

		//是否多次查询
		if (Array.isArray(interfaceData)) {
			interfaceData.forEach(async (value) => {
				let result: object = await this.singleInterfaceSigleQuery(interfaceName, value)
				resultArray.push(result)
			}) // end of interfaceData.forEach
			return resultArray
		} else {
			return await this.singleInterfaceSigleQuery(interfaceName, interfaceData)
		}
	}

	//单接口单次查询
	async singleInterfaceSigleQuery(interfaceName, interfaceData) {
		let result: object = await this.interfaces[interfaceName](interfaceData)
		const { filters = false } = interfaceData
		if (!filters) {
			result = this.filter(filters, result)
		}
		return result
	}

	filter(filterArray, filterData): object {
		return
	}
} //end of Phl
