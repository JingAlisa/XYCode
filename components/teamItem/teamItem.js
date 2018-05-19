// pages/template/teamItem/teamItem.js
Component({
  relations:{
    '../teamList/teamList':{
      type: 'parent'
    }
  },
  properties: {
    itemData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon60:'../../public/img/avatar/16.png',
    showCard:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCard:function(e){
      this.setData({
        showCard:true
      })
      console.log(e);
    },
    hideCard:function(e){
      this.setData({
        showCard: false
      })
    },
    jumpToteamDetail:function(){
      let that=this;
      this.setData({
        showCard: false
      });
      wx.navigateTo({
        url: '../../pages/teamDetail/teamDetail?id=' + that.properties.itemData._id
      })
    },
    stopScroll:function(){
    }
  }
})
