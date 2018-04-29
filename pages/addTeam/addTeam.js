// pages/addTeam/addTeam.js
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

    // 调用添加新的战队函数
    this.addTeam();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //当用户提交创建战队申请后
  addTeam:function(){
    //获取用户填写的数据
    let addData={
      "team":{
        "title":"放风筝",
        "category":"life",
        "description":"春风正好，有没有想一起去田野中奔跑的小伙伴呢",
        "memberMaxNumber":5,
        "preserveMaxDays":7,
        "contact": [{
          "way": "wechat",
          "text": "Alisa123"
        }],
        "createrUid":"xd_Alisa"
      }
    };
    let addTeamURL = app.globalData.g_API + "/xiaoyuan/api/v1/team";
    util.postHttpRequest(addTeamURL, addData, this.dealAddTeam);  
  },

  //添加后的处理函数
  dealAddTeam:function(data){
    console.log(data);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})