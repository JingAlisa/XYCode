// pages/mine/mine.js
const app = getApp();
const LOGIN = require("../../utils/login.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  loginManually: function () {
    LOGIN.login().then((key) => {
      // 目前的key暂时是openid
      console.log('登陆获得的session_3rd为 ' + key)
    }).catch((e) => {
      console.log("登陆失败，错误为 ")
      console.log(e)
    })
  },

  selectUser: function(){
    let itemList = ['xd_www', 'xd_zxh', 'xd_Alisa']
    wx.showActionSheet({
        itemList: itemList,
        success: function(res) {
            if (!res.cancel) {
                app.globalData.userId = itemList[res.tapIndex]
                // 强制刷新所有页面，否则global.userId不会重载
                wx.reLaunch({
                  url: '../../pages/mine/mine'
                })
            }
        }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})