// components/Team/AplForm/AplForm.js
const Team = require("../../../utils/team");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    contactWays: ['qq', 'wechat', 'phone'],
    contactWayTexts: ['QQ', '微信', '电话'],
    contactWayIndex: 0,
    contactText: '',
    applyInfo: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindContactWaysChange: function (e) {
      this.setData({
        contactWayIndex: e.detail.value
      })
    },

    bindContactTextChange: function (e) {
      this.setData({
        contactText: e.detail.value
      })
    },

    bindApplyInfoChange: function (e) {
      this.setData({
        applyInfo: e.detail.value
      })
    },

    submitApl: function () {
      let contact = [{
        way: this.data.contactWays[this.data.contactWayIndex],
        text: this.data.contactText
      }]

      Team.addApplication(this.data.teamId, contact, this.data.applyInfo).then(_ => {
        console.log('申请成功')
        console.log(_)
        this.triggerEvent('refreshTeam', {})
      })
    }

  }
})
