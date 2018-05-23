const app = getApp();
const { Request, ajax } = require("./http.js");

function getMsgs (role, userId) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/messages?role=" + role
  return new Promise((resolve, reject) => {
    ajax(url).then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

function getMsgsCount () {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/messages/count"
  return new Promise((resolve, reject) => {
    ajax(url).then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

function getSearch(keyword){
  let url = app.globalData.g_API +"/xiaoyuan/api/v1/teams/s?keyword="+keyword;
  return new Promise((resolve,reject)=>{
    ajax(url).then((res) => {
      if (!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}

function getTeam (teamId, msg_id) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + teamId
  let data = {}
  if(msg_id) {
    data.msg = msg_id
  }
  return new Promise((resolve, reject) => {
    ajax(url, data).then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

function addTeam (team) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/team";
  return new Promise((resolve, reject) => {
    ajax(url, { team }, 'POST').then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

function getApplications (teamId) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + teamId +"/applications";
  return new Promise((resolve, reject) => {
    ajax(url).then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})
}

function getApplyList(uid,pageIndex,pageSize) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/teams?role=applicant&uid=" + uid+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
  return new Promise((resolve, reject) => {
    ajax(url).then((res) => {
      if (!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}

function getPublicList(uid, pageIndex, pageSize) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/teams?role=creater&uid=" + uid + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
  return new Promise((resolve, reject) => {
    ajax(url).then((res) => {
      if (!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}

function addApplication (teamId, contact, applyInfo) {
  let url = app.globalData.g_API +"/xiaoyuan/api/v1/team/" + teamId +"/application";
  let application = {
    applyInfo,
    contact
  }
  return new Promise((resolve, reject) => {
    ajax(url, {application}, 'POST').then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	})  
}

function addJudgment (teamId, applicationId, accept) {
  let url = app.globalData.g_API +"/xiaoyuan/api/v1/team/"+ teamId + "/judgment";
  let judgment = {
    applicationId,
    accept
  }
  return new Promise((resolve, reject) => {
    ajax(url, {judgment}, 'POST').then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	}) 
}

module.exports = {
  getMsgs,
  getMsgsCount,
  getSearch,
  getTeam,
  addTeam,
  getApplyList,
  getPublicList,
  getApplications,
  addApplication,
  addJudgment
}