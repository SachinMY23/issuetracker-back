const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'
let now = () => {
  return moment.utc().format()
}

let getLocalTime = () => {
  return moment().tz(timeZone).format()
}

let convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('LLLL')
}

let timeExp=(time)=>{
   return moment(time).tz(timeZone).format('LLLL');
}

let getMeetingTime=()=>{
  return moment().add(1, 'minute').
  format('LLLL')
}
module.exports = {
  now: now,
  getLocalTime: getLocalTime,
  convertToLocalTime: convertToLocalTime,
  timeExp:timeExp,
  getMeetingTime:getMeetingTime
}