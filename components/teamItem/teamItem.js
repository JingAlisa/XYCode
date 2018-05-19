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
      value:{},
      observer:function(newVal,oldVal){
        var that=this;
        var createTime=new Date(newVal.createTime).getTime();
        var nowTime=new Date().getTime();
        let preserveMaxDays = newVal.preserveMaxDays*24;
        // 获取剩余天数
        var leftTime=((preserveMaxDays-(nowTime-createTime)/3600000)/24).toFixed(2);
        that.setData({
          leftTime:leftTime
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon60:'../../public/img/avatar/16.png',
    showCard:false,
    leftTime:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCard:function(e){
      this.setData({
        showCard:true
      })
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
        url: '../../pages/teamDetail/teamDetail?id=' + that.properties.itemData._id + "&leftTime=" + that.data.leftTime
      })
    },
    stopScroll:function(){
    }
  }
})
