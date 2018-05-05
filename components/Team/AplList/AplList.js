// components/Team/AplList/AplList.js
Component({
  relations: {
    "../AplItem/AplItem": {
      type: "child"
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    applications: Array,
    isCreater: Boolean,
    aplArea: String
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
    refreshTeam: function () {
      console.log('AplList组件收到从AplItem传来的judgmentAdded事件')
      this.triggerEvent('refreshTeam', { })
    }
  }
})
