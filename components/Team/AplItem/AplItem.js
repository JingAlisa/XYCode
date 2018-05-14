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
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        confirmText: "主操作",
        cancelText: "辅助操作",
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
      wx.showToast({
        title: '已复制到剪切板',
        icon: 'success',
        duration: 2000
      })
    },

    makePhoneCall: function () {
      wx.makePhoneCall({
        phoneNumber: '13119118432' //仅为示例，并非真实的电话号码
      })
    }
  }
})
