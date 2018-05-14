// pages/mine/mine.js
const app = getApp();
const { login, getUserInfoFromWx } = require("../../utils/login.js");
const { getUserInfo, setUserInfo } = require('../../utils/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    avatarBdUrl: '../../public/img/mine/avatar_bd.png',
    teamsPubBdUrl: '../../public/img/mine/pub_bd.png',
    teamsAplBdUrl: '../../public/img/mine/apl_bd.png',
    teamsEntryHeight: 0,
    nickName: ''
  },

  loginManually: function () {
    let that = this

    login().then((key) => {
      // 目前的key暂时是openid
      console.log('登陆获得的session_3rd为 ' + key)
      getUserInfoFromWx().then(_ => {
        // _.nickName
        setUserInfo(_)
        that.setData({
          avatarUrl: _.avatarUrl,
          nickName: _.nickName
        })
      })
    }).catch((e) => {
      console.log("登陆失败，错误为 ")
      console.log(e)
    })
  },

  clearLocalLogin: function () {
    let that = this
    wx.removeStorage({
      key: 'session_3rd',
      success: function () {
        that.loginManually()
      }
    })
  },

  getUserInfoFromServer: function () {
    let that = this
    getUserInfo().then(_ => {
      console.log(_)
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
    let that = this
    getUserInfo().then(_ => {
      let userInfo = _.user
      if(!(userInfo.avatarUrl && userInfo.nickName)) {
        getUserInfoFromWx().then(_ => {
          setUserInfo(_)
          that.setData({
            avatarUrl: _.avatarUrl,
            nickName: _.nickName
          })
        })
      } else {
        that.setData({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName
        })
      }  
    })

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.selectAll('.teamsEntry').boundingClientRect()
    query.exec(function (res) {
      let width = res[0][0].width
      that.setData({
        teamsEntryHeight: width * 1.15
      })
    })
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