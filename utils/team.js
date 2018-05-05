const app = getApp();
const { Request } = require("./http.js");

function getTeam (teamId) {
  let url = app.globalData.g_API + "/xiaoyuan/api/v1/team/" + teamId;
  return new Promise((resolve, reject) => {
    Request(url).then((res) => {
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
    Request(url).then((res) => {
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
    applicantUid: app.globalData.userId,
    applyInfo,
    contact
  }
  return new Promise((resolve, reject) => {
    Request(url, {application}, 'POST').then((res) => {
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
    Request(url, {judgment}, 'POST').then((res) => {
      if(!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
	}) 
}

module.exports = {
  getTeam,
  getApplications,
  addApplication,
  addJudgment
}