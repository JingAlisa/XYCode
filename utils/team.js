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

function getTeam (teamId) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + teamId;
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
  getSearch,
  getTeam,
  addTeam,
  getApplications,
  addApplication,
  addJudgment
}