export const dateFormat = (date, format) => {
  if (format === undefined) {
    format = date;
    date = new Date();
  }

  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });

  return format;
};

// 秒转化成 时分秒
export const secondToDate = (result) => {
  const h = Math.floor(result / 3600);
  const m = Math.floor((result / 60) % 60);
  const s = Math.floor(result % 60);
  // return h + '小时' + m + '分钟' + s + '秒';
  return (
    (h < 10 ? `0${h}` : h) +
    ':' +
    (m < 10 ? `0${m}` : m) +
    ':' +
    (s < 10 ? `0${s}` : s)
  );
};

export const timeDifference = (startTime, endTime) => {
  const time = secondToDate((endTime - startTime) / 1000).split(':');
  return (
    // tslint:disable-next-line: radix
    parseInt(time[0]) +
    '时' +
    // tslint:disable-next-line: radix
    parseInt(time[1]) +
    '分' +
    // tslint:disable-next-line: radix
    parseInt(time[2]) +
    '秒'
  );
};

export const secondToTime = (result) => {
  const h = Math.floor(result / 3600);
  const m = Math.floor((result / 60) % 60);
  const s = Math.floor(result % 60);
  if (h === 0) {
    return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
  } else {
    return (
      (h < 10 ? `0${h}` : h) +
      ':' +
      (m < 10 ? `0${m}` : m) +
      ':' +
      (s < 10 ? `0${s}` : s)
    );
  }
};

// formatDate
export default {
  dateFormat,
  secondToTime,
  timeDifference,
  secondToDate
}
