// pages/template/categoryer/categoryer.js
// var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const util=require('../../utils/util');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Array,
      value:[],
      observer:function(newVal,oldVal){
        console.log('123');
        let that=this;
        let category='';
        switch (that.data.activeIndex) {
          case '0':
            category = 'all';
            break;
          case '1':
            category = 'study';
            break;
          case '2':
            category = 'life';
            break;
          case '3':
            category = 'friends';
            break;
        }
        var categoryData = util.filterData(newVal, category);
        that.setData({
          categoryData: categoryData
        })
        console.log(that.data.categoryData);
      }
    },
    result:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: ["全部", "学习", "生活","交友"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    categoryData:[],
    activeTab:[]
  },

  ready:function(){
    this.setData({
      categoryData: this.properties.listData
    })
    console.log(this.data.categoryData)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
    },
    tabClick: function (e) {
      let activeTab=[];
      activeTab[e.currentTarget.id] ='activeTabItem';
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id,
        activeTab: activeTab
      });
      console.log(e.currentTarget.id);
      console.log(this.properties.listData);
      let listData = this.properties.listData;
      let category = '';
      switch (e.currentTarget.id) {
        case '0':
          category = 'all';
          break;
        case '1':
          category = 'study';
          break;
        case '2':
          category = 'life';
          break;
        case '3':
          category = 'friends';
          break;
      }
      console.log(this);
      var categoryData =util.filterData(listData,category);
      this.setData({
        categoryData: categoryData
      })
    }

    
  }
})
