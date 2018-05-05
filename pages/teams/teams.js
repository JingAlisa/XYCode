// pages/teams/teams.js
const app=getApp();
const util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    pageIndex: 1,
    pageSize: 8,
    result: '正在加载...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取所有战队数据
    // let teamsURL = app.globalData.g_API +"/xiaoyuan/api/v1/teams?status=true";
    // util.getHttpRequest(teamsURL,this.dealTeams);

    //获取首次加载的数据
    let lazyURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?status=true&pageIndex=1&pageSize=10";
    util.getHttpRequest(lazyURL, this.dealLazy);
  },

  // //获取战队数据后的处理函数
  // dealTeams:function(data){
  //   console.log(data);
  // },

  //获取懒加载数据后的处理
  dealLazy: function (data) {
    let pageIndex = this.data.pageIndex + 1;
    this.setData({
      pageIndex: pageIndex
    });
    console.log();
    var arrData = data.data.teams;
    console.log(arrData);
    if (arrData == undefined) {
      this.setData({
        result: '到底咯'
      })
    } else {
      if (this.data.listData === []) {
        this.setData({
          listData: arrData
        })
      } else {
        this.setData({
          listData: this.data.listData.concat(arrData)
        })
      }
    }

    console.log(this.data.listData);


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
    let lazyURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?status=true&" + "pageIndex=" + this.data.pageIndex + "pageSize=" + this.data.pageSize;
    util.getHttpRequest(lazyURL, this.dealLazy);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})