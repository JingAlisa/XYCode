// pages/home/home.js
const app=getApp();
const util=require("../../utils/util.js");
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
    console.log(app.globalData);
    // 获取slider热门消息
    let hotURL = app.globalData.g_API +"/xiaoyuan/api/v1/teams?attr=hot";
    util.getHttpRequest(hotURL,this.dealHot);

    //获取首次加载的数据
    let lazyURL = app.globalData.g_API +"/xiaoyuan/api/v1/teams?status=true&pageIndex=1&pageSize=10";
    util.getHttpRequest(lazyURL, this.dealLazy);
  },

  //获取slider数据后的处理函数
  dealHot:function(data){
    console.log(data);
  },

  //获取懒加载数据后的处理
  dealLazy:function(data){
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
    //上拉触底后再次向后台请求数据
    let lazyURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?status=true&pageIndex=1&pageSize=10";
    util.getHttpRequest(hotURL, this.dealLazy);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})