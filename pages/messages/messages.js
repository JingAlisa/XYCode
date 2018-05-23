// pages/messages/messages.js
const app = getApp();
const util = require("../../utils/util.js");
const Team = require("../../utils/team")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userUid: '',
    msgs_pub: [],
    msgs_apl: []
  },

  initMsgList() {
    let that = this

    let msgs_pub_unknown = [],
        msgs_apl_unknown = [],
        msgs_known = []
      
    let createrIsOK = false, // creater和applicant两者均已经处理OK，确保可以对已读进行时间排序了（二者异步并行，只能这样保证执行结束）
        applicantIsOK = false
    //获取发布消息
    Team.getMsgs('creater', '').then(_ => {
      let msgs = _.messages
      console.log(msgs)
      for(let i = 0; i < msgs.length; i++) {
        msgs[i].isCreater = true
        if(msgs[i].createrKnownA) {
          msgs_known.push(msgs[i])
        } else {
          msgs_pub_unknown.push(msgs[i])
        }
      }
      that.setData({
        msgs_pub_unknown
      })
      createrIsOK = true 
      if(applicantIsOK) {
        createrIsOK = false
        // 对msgs_known重排序
        that.setKnownMsgs(msgs_known)
      }
    })

    //获取申请消息
    Team.getMsgs('applicant', '').then(_ => {
      let msgs = _.messages
      console.log(msgs)
      for(let i = 0; i < msgs.length; i++) {
        msgs[i].isCreater = false
        if(msgs[i].applicantKnownJ) {
          msgs_known.push(msgs[i])
        } else {
          msgs_apl_unknown.push(msgs[i])
        }
      }
      that.setData({
        msgs_apl_unknown
      })
      applicantIsOK = true 
      if(createrIsOK) {
        applicantIsOK = false
        // 对msgs_known重排序
        that.setKnownMsgs(msgs_known)
      }
    });
  },

  // 审核后事件冒泡，触发刷新
  refreshMsgList() {
    this.initMsgList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMsgList()
  },


  compareDate(d1,d2) {
    let time1 = new Date(d1.judgeTime ? d1.judgeTime : d1.applyTime),
        time2 = new Date(d2.judgeTime ? d2.judgeTime : d2.applyTime)

    console.log(time1)

    return (time1 < time2) ? true : false
  },

  // 对msgs_known重排序并setData
  setKnownMsgs(msgs) {
    let msgs_known = msgs.sort((a, b) => {
                       return this.compareDate(a, b)
                     })
    this.setData({
      msgs_known
    })
  },

  //获取发布消息后的处理
  dealPublicLists:function(msgs){
    console.log(msgs)
    this.setData({
      msgs_pub: msgs
    })
  },

  dealApplyLists:function(msgs){
    this.setData({
      msgs_apl: msgs
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
    // 如果没有消息
    if (this.msgs_pub_unknown && this.msgs_apl_unknown && this.msgs_apl_unknown && this.msgs_pub_unknown.length === 0 && this.msgs_apl_unknown.length === 0 && this.msgs_known.length === 0) {
      console.log('123');
      wx.showModal({
        title: '提示框',
        content: '您还没有任何消息，先去主页逛逛？',
        sunccess: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: 'pages/teams/teams',
            })
          } else { }
        }
      })
    }
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