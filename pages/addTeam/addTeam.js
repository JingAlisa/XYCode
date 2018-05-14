// pages/addTeam/addTeam.js
const app = getApp();
const util = require("../../utils/util.js");
const { addTeam } = require("../../utils/team");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 错误消息提示
    showTips:false,
    submitResult:false,

    categoryIndex:0,
    categories:['学习类','生活类','交友类'],
    category:['study','life','friends'],

    saveDaysIndex:0,
    saveDays:['3','5','7'],

    maxMemberIndex:2,
    maxMember:['1','2','3','4','5']
  
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
    // let addData={
    //   "team":{
    //     "title":"放风筝",
    //     "category":"life",
    //     "description":"春风正好，有没有想一起去田野中奔跑的小伙伴呢",
    //     "memberMaxNumber":5,
    //     "preserveMaxDays":7,
    //     "contact": [{
    //       "way": "wechat",
    //       "text": "Alisa123"
    //     }],
    //     "createrUid":"xd_Alisa"
    //   }
    // };
    // let addTeamURL = app.globalData.g_API + "/xiaoyuan/api/v1/team";
    // util.postHttpRequest(addTeamURL, addData, this.dealAddTeam);  
  },

  bindCategoryChange: function (e) {
    console.log('picker category 发生选择改变，携带值为', e.detail.value);

    this.setData({
      categoryIndex: e.detail.value
    })
  },
  bindSaveDaysChange: function (e) {
    console.log('picker saveDays 发生选择改变，携带值为', e.detail.value);

    this.setData({
      saveDaysIndex: e.detail.value
    })
  },

  bindMaxMemberChange: function (e) {
    console.log('picker maxMember 发生选择改变，携带值为', e.detail.value);

    this.setData({
      maxMemberIndex: e.detail.value
    })
  },

  //添加后的处理函数
  formSubmit:function(e){
    let that = this
    //判断是否填写全
    console.log(e.detail.value);
    const formData=e.detail.value;
    if (formData.title == '' || formData.description == '' || (formData.qq=='' && formData.wechat=='' && formData.phone=='')){
      console.log('haha');
      this.setData({
        showTips:true
      });
      let self = this;
      setTimeout(function () {
        self.setData({
          showTips: false
        })
      }, 2000);
    }else{
      let contact=[];
      // 获取联系方式
      if(formData.qq!==''){
        contact.push({
          "way": "qq",
          "text": formData.qq
        })
      }
      if (formData.wechat !== '') {
        contact.push({
          "way": "wechat",
          "text": formData.wechat
        })
      }
      if (formData.phone !== '') {
        contact.push({
          "way": "phone",
          "text": formData.phone
        })
      }
      console.log(contact);
      // 获取用户填写的数据
      let team={
        "title": formData.title,
        "category": this.data.category[formData.category],
        "description":formData.description,
        "memberMaxNumber": this.data.maxMember[formData.maxMember],
        "preserveMaxDays": this.data.saveDays[formData.saveDays],
        "contact": contact
      };
      console.log(team);
      addTeam(team).then(_ => {
        that.addResult()
      })
    }
  },

  addResult:function(){
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 3000
      });
      wx.switchTab({
        url: '../teams/teams',
      })
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})