// pages/teamDetail/teamDetail.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从上一个模板中获取teamId
    let teamId = "5ade88efe1d0b750a755895d";
    this.setData({
      teamId:teamId
    })

    //获取单个战队的详细信息
    let teamDetailURL = app.globalData.g_API +"/xiaoyuan/api/v1/team/"+this.data.teamId;
    util.getHttpRequest(teamDetailURL,this.dealTeamDetail);

    //点击申请
    this.applyPostFun();

    //根据是否为发布者，是否申请，是否通过审批显示不同的数据
    //获取申请列表
    let applyArrURL = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + this.data.teamId+"/applications";
    util.getHttpRequest(applyArrURL,this.dealApplyArr);

    //发布者审批
    this.judgePostFun();
  },

  //获取详细信息后的处理
  dealTeamDetail:function(data){
    console.log(data);
  },

  //获取申请列表数据后的处理
  dealApplyArr:function(data){
    console.log(data);
  },

  //用户提交申请处理
  applyPostFun:function(){
    //获取申请者填写的数据
    let applyData={
      "application":{
        "applicantUid": "xd_Alisa",
        "applyInfo": "I want to keep healthy.",
        "contact": [{
          "way": "wechat",
          "text": "Alisa123"
        }]
      }
    };
    let applyPostURL = app.globalData.g_API +"/xiaoyuan/api/v1/team/"+this.data.teamId+"/application";
    util.postHttpRequest(applyPostURL, applyData, this.dealApplyPost);  
  },
  
  //用户提交申请处理结果
  dealApplyPost:function(data){
    console.log(data);
  },

  //发布者审批
  judgePostFun:function(){
    //获取申请id和审批结果
    let judgeData={
      "judgment":{
        "applicationId":"5ae53a44f4148229e12b36ef",         //该ID为每条申请的id
        "accept":false
      }
    };
    let judgeURL = app.globalData.g_API +"/xiaoyuan/api/v1/team/"+this.data.teamId+"/judgment";
    util.postHttpRequest(judgeURL, judgeData, this.dealJudgepost);  
  },

  //发布者审批后的结果
  dealJudgepost:function(data){
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