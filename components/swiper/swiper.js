Component({
  properties: {
    hotData:{
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {

      }
    }
  },
  data: {
    imgUrls: [
      '../../public/img/logo.png',
      '../../public/img/study.png',
      '../../public/img/life.jpg',
      '../../public/img/friend.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  methods:{
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})