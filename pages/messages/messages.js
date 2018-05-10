// pages/messages/messages.js
const app = getApp();
const util = require("../../utils/util.js");
const Team = require("../../utils/team")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userUid: '',
    msgs_pub: [],
    msgs_apl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //从app.js文件中获取userId
    let userId = app.globalData.userId;

    this.setData({
      userId
    })

    //获取发布消息
    Team.getMsgs('creater', userId).then(_ => {
      that.dealPublicLists(_.messages)
    })

    //获取申请消息
    Team.getMsgs('applicant', userId).then(_ => {
      that.dealApplyLists(_.messages)
    })

  },

  //获取发布消息后的处理
  dealPublicLists:function(msgs){
    this.setData({
      msgs_pub: msgs
    })
  },

  dealApplyLists:function(msgs){
    this.setData({
      msgs_apl: msgs
    })
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