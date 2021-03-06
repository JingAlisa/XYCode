// components/Team/AplForm/AplForm.js
const Team = require("../../../utils/team");

import {
  getUserInfo,
  setUserInfo
} from '../../../utils/user'

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
    showTips:false,
    contactWays: ['qq', 'wechat', 'phone'],
    contactWayTexts: ['QQ', '微信', '电话'],
    contactWayIndex: 0,
    contactText: '',
    contactTextExisted: '',
    applyInfo: '',
    contacts: [],        // 用户之前填写过的联系方式，在服务端获取
    contactInputType: 'number',
    textareaLength:'0',
    hasNotBindWechat: false
  },

  ready: function () {
    let that = this
    getUserInfo().then(_ => {
      if(!(_.user.avatarUrl && _.user.nickName)) {
        that.setData({
          hasNotBindWechat: true
        })
        return;
      }
      that.setData({
        contacts: _.user.contacts
      })
      let contactsExisted = _.user.contacts
      let contactWaySelected = that.data.contactWays[that.data.contactWayIndex]
      for (let i = 0; i < contactsExisted.length; i++) {
        if(contactWaySelected === contactsExisted[i].way) {
          that.setData({
            contactTextExisted: contactsExisted[i].text,
            contactText: contactsExisted[i].text
          })
          break;
        }
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindContactWaysChange: function (e) {
      let that = this
      this.setData({
        contactWayIndex: e.detail.value
      })
      let contactsExisted = this.data.contacts
      let contactWaySelected = that.data.contactWays[e.detail.value]
      for (let i = 0; i < contactsExisted.length; i++) {
        if(contactWaySelected === contactsExisted[i].way) {
          that.setData({
            contactTextExisted: contactsExisted[i].text,
            contactText: contactsExisted[i].text,
            contactInputType: contactsExisted[i].way === 'wechat' ? 'text' : 'number'
          })
          break;
        }
      }
    },

    bindContactTextChange: function (e) {
      this.setData({
        contactText: e.detail.value
      })
    },

    GetUserInfoAndSubmit(e) {
      setUserInfo(e.detail.userInfo)
      this.submitApl()
    },

    submitApl: function () {
      let that = this

      if(!this.data.contactText || !this.data.applyInfo) {
        this.setData({
          showTips: true
        });
        setTimeout(function () {
          that.setData({
            showTips: false
          })
        }, 1000);
        return;
      }

      let contact = [{
        way: this.data.contactWays[this.data.contactWayIndex],
        text: this.data.contactText
      }]

      wx.showToast({
        title: '正在提交...',
        icon: 'loading',
        duration: 10000
      });
      console.log(this.data.applyInfo);

      Team.addApplication(this.data.teamId, contact, this.data.applyInfo).then(_ => {
        console.log('申请成功')
        console.log(_)
        this.triggerEvent('refreshTeam', {})
        wx.hideToast();
      })
    },

    clearApl: function () {
      this.setData({
        applyInfo: ''
      })
    },

    // textarea根据输入的个数变化
    changeTextareaNum: function (e) {
      this.setData({
        applyInfo: e.detail.value,
        textareaLength: e.detail.value.length
      })
    }

  }
})
