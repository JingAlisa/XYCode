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

// 从微信获取用户信息
function getUserInfoFromWx(){
	return new Promise((resolve, reject) => {
		wx.getUserInfo({
			success: function(response) {
				// var userInfo = res.userInfo
				// var nickName = userInfo.nickName
				// var avatarUrl = userInfo.avatarUrl
				// var gender = userInfo.gender //性别 0：未知、1：男、2：女
				// var province = userInfo.province
				// var city = userInfo.city
				// var country = userInfo.country
				resolve(response.userInfo)
			}
		})
	})
}

module.exports = {
	checkSession,
	login,
	getUserInfoFromWx
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