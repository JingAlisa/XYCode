// pages/messages/messages.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从app.js文件中获取userId
    let userId = app.globalData.userId;

    //获取发布消息
    let publicListsURL = app.globalData.g_API + "/xiaoyuan/api/v1/message/" + userId +"?role=creater";
    util.getHttpRequest(publicListsURL, this.dealPublicLists);

    //获取申请消息
    let applyListsURL = app.globalData.g_API + "/xiaoyuan/api/v1/message/" + userId + "?role=applicant";
    util.getHttpRequest(applyListsURL, this.dealApplyLists);
  },

  //获取发布消息后的处理
  dealPublicLists:function(data){
    console.log(data);
  },

  dealApplyLists:function(data){
    console.log(data);
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