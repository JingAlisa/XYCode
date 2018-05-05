// components/Team/AplItem/AplItem.js
const Team = require("../../../utils/team");

Component({
  relations: {
    '../AplList/AplList': {
      type: 'parent'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    application: Object,
    isCreater: Boolean
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
    judge: function (e) {
      Team.addJudgment(this.data.application.teamId, this.data.application._id, e.currentTarget.dataset.agree).then(_ => {
        console.log('审核成功')
        console.log(_)
        this.triggerEvent('judgmentAdded', { })
      })
    }
  }
})
