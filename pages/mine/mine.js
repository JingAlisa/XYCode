// pages/mine/mine.js
const app = getApp();
const { login, getUserInfoFromWx } = require("../../utils/login.js");
const { getUserInfo, setUserInfo, getRelativeTeamsCount } = require('../../utils/user')

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
    nickName: '',
    uid:''
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
          nickName: _.nickName,
          uid:_.uid
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
  jumpPublic:function(){
    let that = this
    wx.navigateTo({
      url: '../minePublic/minePublic?uid=' + that.data.uid
    })
  },
  jumpApply:function(){
    let that=this
    wx.navigateTo({
      url: '../mineApply/mineApply?uid=' + that.data.uid
    })
  },

  // 通过按钮绑定微信，获取头像昵称信息
  bindgetuserinfo(e) {
    let _ = e.detail.userInfo
    setUserInfo(_)
    that.setData({
      avatarUrl: _.avatarUrl,
      nickName: _.nickName,
      uid: _.uid,
      hasNotBindWechat: false
    })
    wx.showToast({
      title: '成功获取微信用户信息',
      icon: 'none',
      duration: 1000
    })
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
      console.log(userInfo)
      if(!(_.user.avatarUrl && _.user.nickName)) {
        // 当前数据库中无头像和昵称
        wx.getSetting({
          success: function(res){
            // 检查是否曾授权
            if (res.authSetting['scope.userInfo']) {
              // 1.已经授权，可以直接调用 getUserInfo 获取头像昵称
              getUserInfoFromWx().then(_ => {
                setUserInfo(_)
                that.setData({
                  avatarUrl: _.avatarUrl,
                  nickName: _.nickName,
                  uid: _.uid
                })
                wx.showToast({
                  title: '成功获取微信用户信息',
                  icon: 'none',
                  duration: 1000
                })
              })
            } else {
              // 2. 若从未授权，显示绑定微信按钮，并Toast提示
              that.setData({
                hasNotBindWechat: true
              })
              wx.showToast({
                title: '请先绑定微信账号',
                icon: 'none',
                duration: 1000
              })

            }
          }
        })
      } else {
        that.setData({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          uid: userInfo.uid
        })
      } 
      // 获取参与战队数量
      getRelativeTeamsCount().then(_ => {
        that.setData({
          createTeamCount: _.createTeamCount,
          applyTeamCount: _.applyTeamCount
        })
      }) 
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
  
  }
})