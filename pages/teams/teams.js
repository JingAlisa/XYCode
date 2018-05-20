// pages/teams/teams.js
const app=getApp();
const util=require("../../utils/util.js");

import {
  getMsgsCount
} from '../../utils/team'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    pageIndex: 1,
    pageSize: 8,
    result: '',
    searchShow:false,
    searchData:[],
    unreadNum: 0    // 未读消息数目
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    //获取所有战队数据
    // let teamsURL = app.globalData.g_API +"/xiaoyuan/api/v1/teams?status=true";
    // util.getHttpRequest(teamsURL,this.dealTeams);

    // 获取slider热门消息
    let hotURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?attr=hot";
    util.getHttpRequest(hotURL, this.dealHot);

    //获取首次加载的数据
    let lazyURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?status=true&pageIndex=1&pageSize=10";
    util.getHttpRequest(lazyURL, this.dealLazy);

    // 获取未读消息数目
    getMsgsCount().then(_ => {
      console.log('获取到了')
      that.setData({
        unreadNum: _.unreadNum
      })
    }).catch(e => {
      console.log(e)
    })
  },

  //获取slider数据后的处理函数
  dealHot: function (data) {
    console.log(data);
    let dataArr = data.data.teams;
    let hotData = [];
    for (let key in dataArr) {
      if (dataArr[key].team === null) {
        hotData[key] = {
          title: '在校缘与你相遇',
          slogan: '校缘致力于为大家提供一个交流的机会',
          description: '让每个有想法的人不再孤军奋战'
        }
      } else {
        switch (dataArr[key].category) {
          case "study":
            hotData[0] = dataArr[key].team;
            hotData[0].class = '爱学习'
            break;
          case "life":
            hotData[1] = dataArr[key].team;
            hotData[1].class = '爱生活'
            break;
          case "friends":
            hotData[2] = dataArr[key].team;
            hotData[2].class = '爱社交'
            break;
          default:
            break;
        }
      }
    }
    this.setData({
      hotData: hotData
    })
  },



  //获取懒加载数据后的处理
  dealLazy: function (data) {
    let pageIndex = this.data.pageIndex + 1;
    this.setData({
      pageIndex: pageIndex
    });
    console.log();
    var arrData = data.data.teams;
    console.log(arrData);
    if (arrData.length==0) {
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
  searchResult:function(e){
    console.log(e.detail.searchData.teams);
    this.setData({
      searchShow:true,
      searchData:e.detail.searchData.teams,
      result:'没有更多了'
    })
  },
  clearSearch:function(e){
    this.setData({
      searchShow:false,
      result:'',
      searchData:[]
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
    this.setData({
      result: '正在加载...'
    });
    //上拉触底后再次向后台请求数据
    console.log(this.data.pageIndex);
    let lazyURL = app.globalData.g_API + "/xiaoyuan/api/v1/teams?status=true&" + "pageIndex=" + this.data.pageIndex + "&pageSize=" + this.data.pageSize;
    util.getHttpRequest(lazyURL, this.dealLazy);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})