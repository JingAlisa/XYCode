const app = getApp();
const { Request, ajax } = require("./http.js");
const { checkSession, login } = require("./login.js");

// 获取用户信息
function getUserInfo () {
	let url = app.globalData.g_API + "/xiaoyuan/api/v1/user/userinfo";
  return new Promise((resolve, reject) => {
    login().then(_ => {
      ajax(url).then((res) => {
        if(!res.code) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
    })
    
	})
}

// 更新用户信息
function setUserInfo (userInfo) {
	let url = app.globalData.g_API + "/xiaoyuan/api/v1/user/userinfo";
  return new Promise((resolve, reject) => {
    ajax(url, { userInfo }, 'POST').then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

// 更新用户信息

module.exports = {
  getUserInfo,
  setUserInfo
}