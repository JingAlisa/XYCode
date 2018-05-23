const { checkSession, login } = require("./login.js");

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

// 请求，含微信身份验证
function ajax(url, Data, method="GET", config={}){
	let data = Data ? Data : {}
	let session_3rd = wx.getStorageSync('session_3rd') // 获取skey
	if(!session_3rd){  // 没有skey，首次登录
		return new Promise((resolve, reject) => {
			login().then(session_3rd => {
				data.session_3rd = session_3rd
				wx.request({
					url,
					method: method.toLocaleUpperCase(),
					data,
					success: (ret) => {
						resolve(ret.data)
					}
				})
			})
		})
	} else {
		return new Promise((resolve, reject) => {
      checkSession().then( _=> {
        if (_){ // 微信登陆态有效
					data.session_3rd = session_3rd
          wx.request({
            url,
            method: method.toLocaleUpperCase(),
            data,
            success: (ret) => {
							if(!ret.data.code) {
								resolve(ret.data)
							} else if(ret.data.code === 2001) {
								// session_3rd无效，即登陆可能已经过期或者在其他设备登陆了
								login().then(session_3rd => {
									data.session_3rd = session_3rd
									wx.request({
										url,
										method: method.toLocaleUpperCase(),
										data,
										success: (ret) => {
											resolve(ret.data)
										}
									})
								})
							} else {
              	console.log('ERROR In ajax(): ')
								console.log(ret.data)
							}
            }
          })
        } else { // 微信登陆态失效
          login().then(session_3rd => {
						data.session_3rd = session_3rd
						wx.request({
							url,
							method: method.toLocaleUpperCase(),
							data,
							success: (ret) => {
								resolve(ret.data)
							}
						})
					})
          // reject('session_3rd')
        }
      })
    })

	}
}

module.exports = {
	Request,
	ajax
}