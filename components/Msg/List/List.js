// Components/Msg/List/List.js
Component({
  relations: {
    "../Item/Item": {
      type: "child"
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    msgs: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        
      }
    },
    category: String
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
    refreshMsgList: function () {
      console.log('MsgList组件收到从MsgItem传来的judgmentAdded事件')
      this.triggerEvent('refreshMsgList', { })
    }
  }
})
