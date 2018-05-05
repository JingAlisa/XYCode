Component({
  relations:{
    '../teamItem/teamItem':{
      type:'child'
    }
  },
  properties: {
    listData:{
      type:Array,
      value:[],
      observer:function(newVal,oldVal){

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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    

  }
})
