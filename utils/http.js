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
		wx.switchTab({
			url: '/pages/mine/mine'
		})
		// return new Promise((resolve, reject) => {
		// 	LOGIN.login()
		// 	reject('请登录')
		// })
	} else {
		return new Promise((resolve, reject) => {
      checkSession().then( _=> {
        if (_){ // session_key有效
					data.session_3rd = session_3rd
          wx.request({
            url,
            method: method.toLocaleUpperCase(),
            data,
            success: (ret) => {
              resolve(ret.data)
            }
          })
        } else { // session_3rd失效
          login().then(_ => {
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