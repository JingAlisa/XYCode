// pages/specialPages/specialPages.js
const app = getApp();
const util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    category:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.category);
    this.setData({
      category:options.category
    });
    // 获取已经加入的战队信息
    let tag='kunpeng';
    let specialURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?tag="+tag;
    console.log(specialURL);
    util.getHttpRequest(specialURL, this.dealJoindTeams);
  },
  newTeam:function(){
    let that=this;
    app.globalData.specialCategory = that.data.category;
    console.log(that.data.category);
    wx.switchTab({
      url: '../addTeam/addTeam',
    })
  },

  dealJoindTeams:function(data){
    console.log(data);
    this.setData({
      listData:data.data.teams
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