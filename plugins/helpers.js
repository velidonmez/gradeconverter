import Vue from 'vue'

/* date
* format: full, date, time, std
*        "d m y h i s D M" : day, month, year, hour, minute, second, day text, month text
* */
Vue.prototype.$date = (date, format = 'full') => {
  date = new Date(date)
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  date = {
    day: (date.getDate()) < 10 ? '0' + (date.getDate()) : (date.getDate()),
    month: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
    hours: (date.getHours()) < 10 ? '0' + (date.getHours()) : (date.getHours()),
    minutes: (date.getMinutes()) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes()),
    seconds: (date.getSeconds()) < 10 ? '0' + (date.getSeconds()) : (date.getSeconds()),
    year: date.getFullYear(),
    monthText: months[date.getMonth()],
    dayText: days[date.getDay()]
  }
  switch (format) {
    case 'std':
      return date.day + ' ' + date.monthText + ' ' + date.year + ' ' + date.dayText
    case 'full':
      return date.day + '.' + date.month + '.' + date.year + ' ' + date.hours + ':' + date.minutes
    case 'date':
      return date.day + '.' + date.month + '.' + date.year
    case 'dateStd':
      return date.year + '-' + date.month + '-' + date.day
    case 'time':
      return date.hours + ':' + date.minutes + ':' + date.seconds
    default:
      return format.replace('d', date.day)
        .replace('m', date.month)
        .replace('y', date.year)
        .replace('h', date.hours)
        .replace('i', date.minutes)
        .replace('s', date.seconds)
        .replace('D', date.dayText)
        .replace('M', date.monthText)
  }
}

Vue.prototype.$localISOTimeNOW = (deleteT = false) => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000
  tzoffset = (new Date(Date.now() - tzoffset)).toISOString()
  if (deleteT) {
    return tzoffset.slice(0, 19).replace('T', ' ')
  } else {
    return tzoffset.slice(0, -1)
  }
}

Vue.prototype.$dateLater = (number, date = false) => {
  if (date) {
    date = new Date(date)
  } else {
    date = new Date()
  }
  date = date.setDate(date.getDate() + number)
  return new Date(date)
}
Vue.prototype.$localISOTime = (date, deleteT = false) => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000
  tzoffset = (new Date(date - tzoffset)).toISOString()
  if (deleteT) {
    return tzoffset.slice(0, 19).replace('T', ' ')
  } else {
    return tzoffset.slice(0, -1)
  }
}
