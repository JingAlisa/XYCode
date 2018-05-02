const app = getApp();

// 验证session_key状态
function checkSession(){
	return new Promise((resolve, reject) => {
		wx.checkSession({
			success:function(){
				resolve(true)
			},
			fail:function(){
				reject(false)
			}
		})
	})
}

// 登录
function login(){
	return new Promise((resolve, reject) => {
		wx.showToast({
			title: '正在登录...',
			icon: 'loading',
			duration: 10000
		});
		wx.login({
			success: (ret) => {
				let publicListsURL = app.globalData.g_API + "/xiaoyuan/api/v1/user/login";
				wx.request({
					url: publicListsURL,
					method: 'POST',
					data:{
						from: 'weapp',
						code: ret.code
					},
					success: (response) =>{
						wx.hideToast();
						console.log(response)
						wx.setStorageSync('session_3rd', response.data.data.session_3rd)  // 将session_3rd存在storage里面
						resolve(response.data.data.session_3rd)
					}
				
				})
			}
		})
		
	})
}



// 请求，含微信身份验证
function ajax(url, data, method="GET", config={}){
	let session_3rd = wx.getStorageSync('session_3rd') // 获取skey
	if(!session_3rd){  // 没有skey，首次登录
		return new Promise((resolve, reject) => {
			login()
			reject('请登录')
		})
	} else {
		return new Promise((resolve, reject) => {
      checkSession().then( _=> {
        if (_){ // session_key有效
          wx.request({
            url,
            method: method.toLocaleUpperCase(),
            data,
            header: Object.assign({}, { session_3rd }, config),
            success: (ret) => {
              resolve(ret.data)
            }
          })
        } else { // session_3rd失效
          login()
          reject('session_3rd')
        }
      })
    })

	}
}

module.exports = {
	login
}

// app.Util.ajax('http://172.28.17.99:3000/crypto', { iv: ret.iv, data: ret.encryptedData }, 'post').then(_ => {
//   let data = _.stepInfoList
//   if(data){
//     let Dategroup = this.handleData(data)
//     let step = data.map(item => item.step)
//     this.init(step, Dategroup)
//   }
// }, (err) => {
//   console.log(err)
// })