Component({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  methods:{
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    jumpToMessage:function(e){
      wx.navigateTo({
        url: '../../pages/messages/messages'
      })
    }
  }
})