function Request(url, data, method="GET") {
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			method: method.toLocaleUpperCase(),
			data,
			success: (ret) => {
				resolve(ret.data)
			},
			fail: (error) => {
				console.log(error)
				reject(method + ' failed')
			}
		})
	})
}

module.exports = {
	Request
}