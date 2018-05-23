// pages/addTeam/addTeam.js
const app = getApp();
const util = require("../../utils/util.js");
const { addTeam } = require("../../utils/team");
const user=require("../../utils/user");
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
    maxMember:['1','2','3','4','5'],

    // 已有联系方式
    qq:'',
    wechat:'',
    phone:'',

    // textarea框输入的个数
    textareaLength:'0',

    // 专题页
    specialCategory:'',
    tag:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let session_3rd=wx.getStorageSync('session_3rd');
    console.log(session_3rd);
    user.getUserContact(session_3rd).then(userData=>{
      let contacts = userData.user.contacts;
      for (let i in contacts){
        switch(contacts[i].way){
          case 'qq':
            that.setData({
              qq:contacts[i].text
            });
            break;
          case 'wechat':
            that.setData({
              wechat: contacts[i].text
            });
            break;
          case 'phone':
            that.setData({
              phone: contacts[i].text
            });
            break;
          default:
            break;
        }
      }
    });
    console.log(app.globalData.specialCategory);
    if (app.globalData.specialCategory){
      that.setData({
        specialCategory: '#鲲鹏杯#',
        tag: [app.globalData.specialCategory]
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(getCurrentPages());
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
        "contact": contact,
        "tag":this.data.tag
      };
      console.log(team);
      addTeam(team).then(resData=> {
        console.log(resData.team._id)
        that.addResult(resData.team._id)
      })
    }
  },

  addResult:function(itemId){
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 3000
      });
      // wx.redirectTo({
      //   url: '../teamDetail/teamDetail?id='+itemId
      // })
      wx.reLaunch({
        url: '../teams/teams'
      })
  },

  // textarea根据输入的个数变化
  changeTextareaNum:function(e){
    this.setData({
      textareaLength: e.detail.value.length
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onHide: function () {
    app.globalData.specialCategory='';
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    console.log(app.globalData.specialCategory);
    if (app.globalData.specialCategory) {
      this.setData({
        specialCategory: '#鲲鹏杯#',
        tag: [app.globalData.specialCategory]
      })
    }else{
      this.setData({
        specialCategory: '',
        tag: []
      })
    }
  }
})