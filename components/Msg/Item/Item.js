// Components/Msg/Item/Item.js
Component({
  relations: {
    '../List/List': {
      type: 'parent'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type: Object,
      value: {},
      observe: function(newVal, oldVal) {
        this.getStatus()
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    status: {
      text: '',
      style: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navToTeamDetail: function() {
      wx.navigateTo({
        url: '../../pages/teamDetail/teamDetail?id=' + this.data.msg.teamId
      })
    },

    getStatus: function(Msg) {
      let msg = Msg
      let status = {
        text: '',
        style: ''
      }
      if(msg.judgeTime) {
        if(msg.judgment) {
          status.text = '已通过' 
          status.style = 'badge-primary'
        } else {
          status.text = '未通过' 
          status.style = 'badge-default'
        }
      } else {
        status.text = '审核中' 
      }
    }
  }
})
