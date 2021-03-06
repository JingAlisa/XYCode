const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getHttpRequest=(url,callback)=>{
  wx.request({
    url: url,
    method:'get',
    header:{
      'content-type':'application/json'
    },
    success:function(res){
      callback(res.data);
    }
  })
}

const postHttpRequest=(url,data,callback)=>{
  wx.request({
    url:url,
    method:'post',
    data:data,
    header:{
      'content-type': 'application/json'
    },
    success:function(res){
      callback(res.data);
    }
  })
}

// 过滤函数
const filterData = (listData, category) => {
  if (category == 'all') {
    return listData;
  } else {
    let categoryData = [];
    for (let key in listData) {
      if (listData[key].category == category) {
        categoryData.push(listData[key]);
      }
    }
    return categoryData;
  }

}

module.exports = {
  formatTime: formatTime,
  getHttpRequest: getHttpRequest,
  postHttpRequest: postHttpRequest,
  filterData: filterData
}
