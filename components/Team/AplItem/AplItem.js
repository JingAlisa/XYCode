// components/Team/AplItem/AplItem.js
const Team = require("../../../utils/team");

Component({
  relations: {
    '../AplList/AplList': {
      type: 'parent'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    application: Object,
    isCreater: Boolean,
    from: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function () {
    let that = this
    let contacts = that.data.application.contact
    for(let i = 0; i < contacts.length; i++) {
      let key = contacts[i].way
      that.setData({
        [key]: contacts[i].text
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    judge: function (accept) {
      Team.addJudgment(this.data.application.teamId, this.data.application._id, accept).then(_ => {
        console.log('审核成功')
        console.log(_)
        this.triggerEvent('judgmentAdded', { })
      })
    },
    openJudgeDialog: function () {
      let that = this
      wx.showModal({
        title: that.data.application.applicantNickName,
        content: that.data.application.applyInfo,
        confirmText: "同意",
        cancelText: "拒绝",
        success: function (res) {
            console.log(res);
            if (res.confirm) {
                console.log('用户点击主操作')
                that.judge(true)
            }else{
                console.log('用户点击辅助操作')
                that.judge(false)
            }
        }
      });
    },

    copeWechat: function () {
      let wechat = this.data.wechat
      wx.setClipboardData({
        data: wechat,
        success: function(res) {
          wx.showToast({
            title: '已复制到剪切板',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },

    copeQQ: function () {
      let qq = this.data.qq
      wx.setClipboardData({
        data: qq,
        success: function(res) {
          wx.showToast({
            title: '已复制到剪切板',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },

    makePhoneCall: function () {
      let that = this
      wx.makePhoneCall({
        phoneNumber: that.data.phone //仅为示例，并非真实的电话号码
      })
    }
  }
})
