const Team = require("../../utils/team");
Component({
  properties: {
    unreadNum: {
      type:Number,
      value: 0,
      observer: function (newVal, oldVal) {
        let that=this;
        that.setData({
          messageNum:newVal
        })
      }
    }
  },
  data: {
    inputShowed: false,
    inputVal: "",
    messageNum: 0
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
      this.triggerEvent('clearSearch', {});
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
      if(!this.data.inputVal){
        this.triggerEvent('clearSearch', {});
      }
    },
    searchResult: function(e){
      const self=this;
      Team.getSearch(self.data.inputVal).then((searchData) => {
        console.log('搜索成功')
        console.log(searchData);
        let eventDetail={
          keywords: self.data.inputVal,
          searchData:searchData
        }
        let eventOption={
          composed:true
        }
        this.triggerEvent('resultShow', eventDetail,eventOption);
      })
    },
    jumpToMessage:function(e){
      this.setData({
        messageNum: 0
      });
      wx.navigateTo({
        url: '../../pages/messages/messages'
      })
    }
  }
})