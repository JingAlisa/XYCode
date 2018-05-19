// pages/teamDetail/teamDetail.js
const app = getApp();
const util = require("../../utils/util.js");
const Team = require("../../utils/team")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId:"",
    team: {},
    currUserUid: '',
    applications: [],
    aplArea: 'loading',
    leftTime:''
  },

  /**
   * 判断不同的用户角色，在申请区域显示不同的内容（申请者列表、申请表单
   */
  setRole: function (applications) {
    let that = this
    let currUid = this.data.currUserUid
    let role = 'tourist'
    let apls = []
    if(currUid === this.data.team.createrUid) {
      role = 'creater'
      apls = applications               // 给出全部申请信息
    } else {
      let apls_joined = []
      let apls_curr = []
      for(let i = 0;i < applications.length; i++) {
        if(applications[i].judgeTime && applications[i].judgment) {
          apls_joined.push(applications[i])
        }
        if(currUid === applications[i].applicantUid) {
          role = 'applicant'
          applications[i].applicantNickName = applications[i].applicantNickName + '（我）'
          apls_curr = [ applications[i] ]    // 仅获取到自己的申请信息
          break;
        }
      }
      if(role === 'applicant') {
        if(apls_curr[0].judgeTime && apls_curr[0].judgment) { // 已加入，显示全部队员信息
          let creater = {
            applicantAvatarUrl: that.data.team.createrAvatarUrl,
            applicantNickName: that.data.team.createrNickName,
            applyInfo: '#我是队长#',
            contact: that.data.team.contact,
            judgeTime: '19970101',
            judgment: true
          }
          apls = [creater].concat(apls_joined)
        } else {
          apls = apls_curr
        }
      }
    }
    
    let aplArea = (role === 'creater') ? 'all' : (role === 'tourist' ? 'form' : 'self')  // 还应拓展对于通过审核者和其他申请者的区别
    this.setData({
      aplArea,
      applications: apls
    })
  },

  loadTeam: function (teamID) {
    let that = this
    let teamId = teamID
    if(typeof(teamId) !== 'string' || !teamId) {
      console.log('teamDetail收到从AplList传来的refreshTeam事件')
      teamId = this.data.teamId
    }

    Team.getTeam(teamId).then(_ => {
      console.log(_.team)
      that.setData({
        team: _.team,
        currUserUid: _.team.currUserUid
      })
      return Team.getApplications(teamId)
    }).then(_ => {
      // 判断不同的用户角色，在申请区域显示不同的内容（申请者列表、申请表单）
      console.log(_.applications)
      this.setRole(_.applications)
    }).catch(e => {
      console.log('Promise.then 链式调用中出错了')
      console.log(e)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //从上一个模板中获取teamId和剩余时间
    let teamId = options.id;
    let leftTime=options.leftTime;
    this.setData({
      teamId: teamId,
      leftTime: leftTime
    })

    this.loadTeam(teamId)

    //获取单个战队的详细信息
    //let teamDetailURL = app.globalData.g_API +"/xiaoyuan/api/v1/team/"+this.data.teamId;
    //util.getHttpRequest(teamDetailURL,this.dealTeamDetail);

    //点击申请
    //this.applyPostFun();

    //根据是否为发布者，是否申请，是否通过审批显示不同的数据
    //获取申请列表
    //let applyArrURL = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + this.data.teamId+"/applications";
    //util.getHttpRequest(applyArrURL,this.dealApplyArr);

    //发布者审批
    //this.judgePostFun();
  },

  //获取详细信息后的处理
  dealTeamDetail:function(data){
    let team = data.data.team
    this.setData({
      team,
      userId: team.createrUid
    })
  },

  //获取申请列表数据后的处理
  dealApplyArr:function(data){
    this.setData({
      applications: data.data.applications
    })
  },

  //用户提交申请处理
  applyPostFun:function(){
    //获取申请者填写的数据
    let applyData={
      "application":{
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