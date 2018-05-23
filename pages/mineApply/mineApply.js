// pages/mineApply/mineApply.js
const Team=require('../../utils/team.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    applyData:[],
    pageIndex: 1,
    pageSize: 8,
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    that.setData({
      uid:options.uid
    });
    Team.getApplyList(options.uid,that.data.pageIndex,that.data.pageSize).then((applyData) => {
      console.log(applyData.teams);
      that.setData({
        applyData: applyData.teams
      })
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
    var that = this;
    let pageIndex = that.data.pageIndex + 1;
    that.setData({
      result: '正在加载...',
      pageIndex: pageIndex
    });
    //上拉触底后再次向后台请求数据

    Team.getApplyList(that.data.uid, that.data.pageIndex, that.data.pageSize).then((applyData) => {
      if (applyData.teams.length > 0) {
        that.setData({
          applyData: that.data.applyData.concat(applyData.teams)
        });
      } else {
        that.setData({
          result: '没有喽'
        })
      }
    })
  }
})