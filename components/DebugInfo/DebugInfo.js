// components/DebugInfo/DebugInfo.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curItemUid: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    curLoginUid: ''
  },

  attached: function () {
    let userId = app.globalData.userId;
    this.setData({
      curLoginUid: userId
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
