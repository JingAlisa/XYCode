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
      '../../public/img/swiper/first.png',
      '../../public/img/swiper/second.png',
      '../../public/img/swiper/third.png',
      '../../public/img/swiper/forth.png'
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
    },
    jumpToDetail:function(event){
      let id=event.currentTarget.dataset.id;
      let category = event.currentTarget.dataset.category;
      console.log(category);
      if(category=='life' || category=='study' || category=='friends'){
        wx.navigateTo({
          url: '../../pages/teamDetail/teamDetail?id=' + id
        })
      }else if(category=='default'){
      }else{
        wx.navigateTo({
          url: '../../pages/specialPages/specialPages?id='+id+"&category="+category
        })
      }
    }
  }
})